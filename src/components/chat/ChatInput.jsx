// src/components/chat/ChatInput.jsx
import React, { useEffect, useRef, useState } from "react";
import "../../styles/chatinput.css";

/**
 * ChatInput (streaming + STT)
 *
 * Props:
 *  - onSendText(message)             // called when a final assistant message is created (non-streaming variant)
 *  - onStartAssistantStream(messageId) // optional, tells parent to prepare a streaming assistant message
 *  - onAppendAssistantToken(messageId, token) // parent should append token text
 *  - onFinishAssistantStream(messageId) // marks message finished
 *  - onSendAudio(audioBlob)          // optional
 *  - onUploadFiles(files)            // optional
 *
 * Replace API_BASE with your backend root or use env var VITE_API_BASE.
 */
const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function ChatInput({
  onSendText,
  onStartAssistantStream,
  onAppendAssistantToken,
  onFinishAssistantStream,
  onSendAudio,
  onUploadFiles,
}) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const abortControllerRef = useRef(null);

  // Media / STT
  const [isRecording, setIsRecording] = useState(false);
  const [sttPartial, setSttPartial] = useState(""); // partial transcript from STT websocket
  const mediaRecorderRef = useRef(null);
  const sttSocketRef = useRef(null);

  // files
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  // Create a helper to upload a file list to backend (optional)
  async function uploadFilesBackend(filesArray) {
    if (!filesArray || filesArray.length === 0) return;
    const form = new FormData();
    filesArray.forEach((f) => form.append("files", f));
    const res = await fetch(`${API_BASE}/v1/files/upload`, {
      method: "POST",
      body: form,
    });
    return res.json();
  }

  // --------- STT WebSocket streaming ----------
  const startSTTWebSocket = async () => {
    if (!navigator.mediaDevices) {
      alert("Microphone not supported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 48000, channelCount: 1, echoCancellation: true, noiseSuppression: true },
      });

      // open websocket
      const ws = new WebSocket((API_BASE.startsWith("http") ? API_BASE.replace(/^http/, "ws") : "") + "/v1/audio/stt/stream");
      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        console.debug("STT WebSocket open");
        // create MediaRecorder sending small chunks
        const mr = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
        mediaRecorderRef.current = mr;
        mr.ondataavailable = (e) => {
          if (!e.data || e.data.size === 0) return;
          // read as arrayBuffer and send
          e.data.arrayBuffer().then((buf) => {
            try {
              ws.send(buf);
            } catch (err) {
              console.warn("stt ws send error:", err);
            }
          });
        };

        mr.start(250); // send every 250ms
        setIsRecording(true);
      };

      ws.onmessage = (evt) => {
        // server should send JSON messages: { type: 'partial' | 'final', text: '...' }
        try {
          const msg = typeof evt.data === "string" ? JSON.parse(evt.data) : JSON.parse(new TextDecoder().decode(evt.data));
          if (msg.type === "partial") {
            setSttPartial(msg.text || "");
          }
          if (msg.type === "final") {
            // append final text to input
            setInput((prev) => (prev ? prev + " " + msg.text : (msg.text || "")));
            setSttPartial("");
          }
        } catch (err) {
          console.warn("STT ws parse error", err);
        }
      };

      ws.onclose = () => {
        setIsRecording(false);
        setSttPartial("");
        try {
          stream.getTracks().forEach((t) => t.stop());
        } catch {}
      };

      ws.onerror = (e) => {
        console.error("STT WebSocket error", e);
      };

      sttSocketRef.current = ws;
    } catch (err) {
      console.error("startSTTWebSocket error", err);
      alert("Microphone permission denied or error");
    }
  };

  const stopSTTWebSocket = () => {
    // close media recorder, close socket
    try {
      mediaRecorderRef.current?.stop();
    } catch {}
    try {
      sttSocketRef.current?.close();
    } catch {}
    mediaRecorderRef.current = null;
    sttSocketRef.current = null;
    setIsRecording(false);
    setSttPartial("");
  };

  // --------- Streaming chat completion ----------
  /**
   * sendAndStream: posts input to /chat/completions and streams response tokens.
   * Server must send newline-delimited JSON chunks or SSE with data lines containing tokens.
   * We implement a generic parser: for each chunk of text we try to parse as JSON lines and extract `token` or `delta`.
   */
  const sendAndStream = async (text) => {
    if (!text || text.trim() === "") return;

    setSending(true);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Create a messageId so parent can render a streaming assistant message
    const messageId = `assistant-${Date.now()}`;
    onStartAssistantStream && onStartAssistantStream(messageId);

    try {
      const res = await fetch(`${API_BASE}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "goldege-chat-streaming-v1",
          messages: [{ role: "user", content: text }],
          stream: true,
        }),
        signal,
      });

      if (!res.ok) {
        const textErr = await res.text();
        throw new Error(`Chat API error: ${res.status} ${textErr}`);
      }

      // Read stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Process buffer for possible JSON lines or SSE-style data lines
        const lines = buffer.split(/\r?\n/);
        // keep last incomplete line in buffer
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.trim()) continue;
          // handle SSE "data: " lines
          const matched = line.match(/^data:\s*(.*)$/);
          const payload = matched ? matched[1] : line;

          try {
            const parsed = JSON.parse(payload);
            // server should send { token: "...", delta: "...", done: false }
            if (parsed.token || parsed.delta || parsed.choices) {
              // normalized token text
              const tokenText = parsed.token || parsed.delta || (parsed.choices && parsed.choices[0]?.delta?.content) || "";
              if (tokenText) onAppendAssistantToken && onAppendAssistantToken(messageId, tokenText);
              // handle done signal
              if (parsed.done || parsed.choices?.[0]?.finish_reason) {
                // finish
                onFinishAssistantStream && onFinishAssistantStream(messageId);
              }
            } else {
              // fallback: if parsed has text
              if (parsed.text) {
                onAppendAssistantToken && onAppendAssistantToken(messageId, parsed.text);
              }
            }
          } catch (err) {
            // not JSON - treat as raw chunk
            onAppendAssistantToken && onAppendAssistantToken(messageId, payload);
          }
        }
      }

      // flush remaining buffer
      if (buffer.trim()) {
        try {
          const parsed = JSON.parse(buffer);
          const tokenText = parsed.token || parsed.delta || parsed.text || "";
          if (tokenText) onAppendAssistantToken && onAppendAssistantToken(messageId, tokenText);
        } catch (err) {
          onAppendAssistantToken && onAppendAssistantToken(messageId, buffer);
        }
      }

      // finalization
      onFinishAssistantStream && onFinishAssistantStream(messageId);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Chat stream aborted");
        // let parent handle cleanup if necessary
      } else {
        console.error("sendAndStream error", err);
        onAppendAssistantToken && onAppendAssistantToken(`assistant-error-${Date.now()}`, `⚠️ Error: ${err.message}`);
      }
    } finally {
      setSending(false);
      abortControllerRef.current = null;
    }
  };

  const cancelSend = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setSending(false);
    }
  };

  // ------- UI handlers -------
  const handleSendClick = async () => {
    // if there's local STT partial use that value first
    const finalText = (input + (sttPartial ? " " + sttPartial : "")).trim();
    setSttPartial("");
    setInput("");
    setFiles([]);
    if (finalText) {
      await sendAndStream(finalText);
      onSendText && onSendText(finalText);
    }
  };

  const handleFileSelect = async (e) => {
    const chosen = Array.from(e.target.files || []);
    setFiles((p) => [...p, ...chosen]);
    // optional: upload immediately in background
    const uploaded = await uploadFilesBackend(chosen);
    onUploadFiles && onUploadFiles(uploaded);
    e.target.value = null;
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        cancelSend();
      } catch {}
      try {
        stopSTTWebSocket();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chatinput-outer">
      {/* showing partial STT under input */}
      {sttPartial && <div className="stt-partial">🎙 {sttPartial}</div>}

      <div className="chatinput-bar">
        {/* left file pick */}
        <div className="left-actions">
          <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={handleFileSelect} />
          <button className="icon-btn file-btn" onClick={() => fileInputRef.current.click()}>📎</button>
        </div>

        <div className="input-area">
          <textarea
            className="chat-textarea"
            placeholder="Type a message or press and hold mic to speak..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="bottom-row">
            <div className="left-hint">
              <span className="small-gold">NeuroEdge can make mistakes. Check important info.</span>
            </div>

            <div className="center-controls">
              {/* STT start/stop toggle */}
              {!isRecording ? (
                <button className="mic-btn" onMouseDown={startSTTWebSocket} onTouchStart={(e) => { e.preventDefault(); startSTTWebSocket(); }}>
                  <div className="mic-icon">🎙️</div>
                </button>
              ) : (
                <button className="mic-btn recording" onMouseUp={stopSTTWebSocket} onTouchEnd={(e) => { e.preventDefault(); stopSTTWebSocket(); }}>
                  <div className="mic-icon">■</div>
                </button>
              )}
            </div>

            <div className="right-controls">
              <button className="icon-btn wave-btn" title="Voice helper">🔊</button>

              {!sending ? (
                <button className="send-btn" onClick={handleSendClick} title="Send message">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#ffd700" />
                  </svg>
                </button>
              ) : (
                <button className="send-btn sending" onClick={cancelSend} title="Cancel send">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#ff4d4f" />
                    <path d="M15 9L9 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 9L15 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* files preview */}
      {files.length > 0 && (
        <div className="file-preview-row">
          {files.map((f, i) => (
            <div key={i} className="file-chip">
              <span className="file-name">{f.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
         }
