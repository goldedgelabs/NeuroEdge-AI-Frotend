import React, { useState } from "react";

export default function VoiceSettings() {
  const [language, setLanguage] = useState("en-US");
  const [voice, setVoice] = useState("auto");
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [autoTranscribe, setAutoTranscribe] = useState(true);

  return (
    <div className="voice-settings card">
      <h4>Voice Settings</h4>

      <div className="setting-row">
        <label>Language</label>
        <select className="input" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="sw-KE">Swahili (Kenya)</option>
          <option value="fr-FR">French</option>
        </select>
      </div>

      <div className="setting-row">
        <label>Voice model</label>
        <select className="input" value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option value="auto">GoldEdge-Streaming-v1 (recommended)</option>
          <option value="tts-high">TTS-High-Fidelity</option>
          <option value="low-latency">Low-Latency RealTime</option>
        </select>
      </div>

      <div className="setting-row">
        <label>Noise suppression</label>
        <input type="checkbox" checked={noiseSuppression} onChange={(e) => setNoiseSuppression(e.target.checked)} />
      </div>

      <div className="setting-row">
        <label>Auto-transcribe</label>
        <input type="checkbox" checked={autoTranscribe} onChange={(e) => setAutoTranscribe(e.target.checked)} />
      </div>
    </div>
  );
}
