// src/components/chat/MessageBubble.jsx

import React, { useState } from "react";
import { Copy, RefreshCw, Trash2, MoreVertical } from "lucide-react";
import TypingDots from "../loading/TypingDots";

export default function MessageBubble({
  role = "assistant",
  content = "",
  timestamp,
  isStreaming = false,
  onCopy,
  onDelete,
  onRegenerate,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const bubbleClass =
    role === "assistant"
      ? "bubble bubble-assistant"
      : "bubble bubble-user";

  return (
    <div className={`message-row ${role}`}>
      <div className={bubbleClass}>
        {/* Message Content */}
        <div className="bubble-content">
          {isStreaming ? (
            <TypingDots />
          ) : (
            <p dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>

        {/* Footer */}
        <div className="bubble-footer">
          <span className="timestamp">
            {timestamp || new Date().toLocaleTimeString()}
          </span>

          {/* Menu trigger */}
          <button
            className="bubble-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical size={16} />
          </button>

          {/* Action Menu */}
          {menuOpen && (
            <div className="bubble-menu">
              <button onClick={onCopy}>
                <Copy size={14} /> Copy
              </button>
              <button onClick={onRegenerate}>
                <RefreshCw size={14} /> Regenerate
              </button>
              <button onClick={onDelete} className="danger">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
      }
