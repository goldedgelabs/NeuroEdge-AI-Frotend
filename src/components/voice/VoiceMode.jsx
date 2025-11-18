import React, { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import VoicePlayer from "./VoicePlayer";
import VoiceSettings from "./VoiceSettings";
import "./voice.css";

/**
 * VoiceMode - container for voice features:
 * - toggle on/off
 * - recorder (record, stop, live/transcribe)
 * - player (playback)
 * - settings (voice, noise suppression toggles)
 */
export default function VoiceMode({ onSendAudio /* optional callback(audioBlob) */ }) {
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [openSettings, setOpenSettings] = useState(false);

  const handleSend = (blob) => {
    // Bubble up to parent (Chat) or send to API
    if (onSendAudio) onSendAudio(blob, transcript);
  };

  return (
    <div className="voice-mode">
      <div className="voice-header">
        <h3>Voice Mode</h3>
        <div className="voice-controls">
          <button className="btn-ghost" onClick={() => setOpenSettings((s) => !s)}>
            ⚙️ Settings
          </button>
        </div>
      </div>

      {openSettings && <VoiceSettings />}

      <VoiceRecorder
        onRecorded={(blob, meta) => {
          setRecordedBlob(blob);
          if (meta?.transcript) setTranscript(meta.transcript);
        }}
        onTranscription={(text) => setTranscript(text)}
      />

      <div className="voice-transcript">
        <strong>Transcript:</strong>
        <div className="transcript-text">
          {transcript || <em>No transcript yet</em>}
        </div>
      </div>

      {recordedBlob && (
        <div className="voice-playback-row">
          <VoicePlayer blob={recordedBlob} />
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn-gold"
              onClick={() => handleSend(recordedBlob)}
            >
              Send Audio
            </button>
            <button
              className="btn-outline"
              onClick={() => { setRecordedBlob(null); setTranscript(""); }}
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
          }
