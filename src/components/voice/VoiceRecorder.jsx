import React, { useEffect, useRef, useState } from "react";

/**
 * VoiceRecorder
 * - Uses MediaRecorder & Web Audio API
 * - Emits: onRecorded(blob, meta) when recording stops
 * - Emits: onTranscription(text) while streaming/live
 *
 * NOTE: Browser permissions required. For streaming transcription you must hook up to a server-side STT (WebSocket).
 */

export default function VoiceRecorder({ onRecorded = () => {}, onTranscription = () => {} }) {
  const [recState, setRecState] = useState("idle"); // idle | recording | paused
  const [mediaSupported, setMediaSupported] = useState(Boolean(navigator.mediaDevices && window.MediaRecorder));
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setMediaSupported(Boolean(navigator.mediaDevices && window.MediaRecorder));
    return () => stopAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = async () => {
    if (!mediaSupported) return alert("Media devices not supported in this browser.");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 48000 },
      });
      streamRef.current = stream;

      // setup MediaRecorder
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      audioChunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        // optional: quick client-side duration
        const meta = await getBlobMeta(blob);
        onRecorded(blob, meta);
      };

      mr.start(250); // emit every 250ms
      recorderRef.current = mr;

      // setup analyser for waveform
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      drawWaveform();
      setRecState("recording");
    } catch (err) {
      console.error("Microphone error:", err);
      alert("Microphone access denied or not available.");
    }
  };

  const pause = () => {
    if (!recorderRef.current) return;
    if (recState === "recording") {
      recorderRef.current.pause();
      setRecState("paused");
    } else if (recState === "paused") {
      recorderRef.current.resume();
      setRecState("recording");
    }
  };

  const stop = () => {
    if (!recorderRef.current) return;
    recorderRef.current.stop();
    stopAll();
    setRecState("idle");
  };

  const stopAll = () => {
    try {
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.stop();
      }
    } catch {}
    try {
      streamRef.current?.getTracks?.().forEach((t) => t.stop());
    } catch {}
    try {
      audioContextRef.current?.close?.();
    } catch {}
    cancelAnimationFrame(rafRef.current);
    audioChunksRef.current = [];
    analyserRef.current = null;
    recorderRef.current = null;
  };

  const getBlobMeta = (blob) =>
    new Promise((res) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("audio");
      a.src = url;
      a.addEventListener("loadedmetadata", () => {
        res({ duration: a.duration });
        URL.revokeObjectURL(url);
      });
      a.addEventListener("error", () => res({ duration: 0 }));
    });

  // Draw waveform on canvas
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = "#071022";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffd700";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    draw();
  };

  return (
    <div className="voice-recorder">
      <div className="recorder-canvas">
        <canvas ref={canvasRef} width={600} height={80} />
      </div>

      <div className="recorder-actions">
        <button className="btn-gold" onClick={start} disabled={recState === "recording"}>
          ● Record
        </button>
        <button className="btn-outline" onClick={pause} disabled={recState !== "recording" && recState !== "paused"}>
          ⏯ Pause/Resume
        </button>
        <button className="btn-ghost" onClick={stop} disabled={recState === "idle"}>
          ◼ Stop
        </button>
      </div>

      <div className="recorder-status">Status: <strong>{recState}</strong></div>
    </div>
  );
}
