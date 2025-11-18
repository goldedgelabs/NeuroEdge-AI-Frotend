import React from "react";
import "./ToolDrawer.css";

const tools = [
  { id: "web", name: "Web Search", icon: "🌐" },
  { id: "files", name: "File Upload", icon: "📄" },
  { id: "vision", name: "Vision Input", icon: "🖼️" },
  { id: "code", name: "Code Interpreter", icon: "💻" },
];

export default function ToolDrawer({ open, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="tooldrawer-overlay" onClick={onClose}>
      <div className="tooldrawer" onClick={(e) => e.stopPropagation()}>
        <h3 className="tooldrawer-title">Tools</h3>

        <div className="tooldrawer-grid">
          {tools.map((t) => (
            <button
              key={t.id}
              className="tooldrawer-item"
              onClick={() => {
                onSelect && onSelect(t.id); // wired
              }}
            >
              <span className="tooldrawer-icon">{t.icon}</span>
              {t.name}
            </button>
          ))}
        </div>

        <button className="tooldrawer-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
