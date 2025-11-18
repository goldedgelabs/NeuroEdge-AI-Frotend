import React, { useContext } from "react";
import { UIContext } from "../../context/UIContext";

export default function SettingsDrawer({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-drawer" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-title">⚙️ Chat Settings</h2>

        {/* MODEL SELECTOR */}
        <section className="settings-section">
          <label className="settings-label">Model</label>
          <select className="settings-select">
            <option>GoldEdge Ultra</option>
            <option>GoldEdge Turbo</option>
            <option>GoldEdge Mini</option>
            <option>OpenAI GPT-4.1</option>
            <option>DeepSeek R1</option>
            <option>Gemini Flash</option>
            <option>Local Model</option>
          </select>
        </section>

        {/* TEMPERATURE */}
        <section className="settings-section">
          <label className="settings-label">
            Temperature: <span id="tempValue">1.0</span>
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            defaultValue="1"
            className="settings-slider"
            onInput={(e) => {
              document.getElementById("tempValue").innerText = e.target.value;
            }}
          />
        </section>

        {/* MAX TOKENS */}
        <section className="settings-section">
          <label className="settings-label">
            Response Length (tokens)
          </label>
          <input
            type="number"
            className="settings-input"
            placeholder="Default: 2048"
          />
        </section>

        {/* REASONING DEPTH */}
        <section className="settings-section">
          <label className="settings-label">Reasoning Mode</label>
          <select className="settings-select">
            <option>Automatic</option>
            <option>Shallow Reasoning</option>
            <option>Deep Reasoning</option>
            <option>Chain of Thought</option>
            <option>GoldEdge Ultra Reasoner</option>
          </select>
        </section>

        {/* MEMORY TOGGLE */}
        <section className="settings-section">
          <label className="settings-toggle">
            <input type="checkbox" />
            Enable Memory
          </label>
        </section>

        {/* TOOL PERMISSIONS */}
        <section className="settings-section">
          <h3 className="settings-sub">Tool Permissions</h3>

          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            Web Search
          </label>

          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            File Uploads
          </label>

          <label className="settings-toggle">
            <input type="checkbox" />
            Code Interpreter
          </label>

          <label className="settings-toggle">
            <input type="checkbox" />
            Vision Mode
          </label>
        </section>

        {/* VOICE MODEL */}
        <section className="settings-section">
          <label className="settings-label">Voice Model</label>
          <select className="settings-select">
            <option>GoldEdge Voice v1</option>
            <option>GoldEdge Studio Voice</option>
            <option>AI Natural English</option>
            <option>AI Female Soft</option>
            <option>AI Male Deep</option>
          </select>
        </section>

        {/* THEME */}
        <section className="settings-section">
          <label className="settings-label">Theme</label>
          <select className="settings-select">
            <option>GoldEdge Premium</option>
            <option>Dark</option>
            <option>Light</option>
          </select>
        </section>

        <button className="settings-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
        }
