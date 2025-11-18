import React, { useState } from "react";

export default function WebSearchModal({ onSearch, onClose }) {
  const [query, setQuery] = useState("");

  return (
    <div className="tool-modal-overlay" onClick={onClose}>
      <div className="tool-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="tool-title">🌐 Web Search</h3>

        <input
          type="text"
          className="tool-input"
          placeholder="Search the web..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="tool-btn"
          onClick={() => {
            if (query.trim()) onSearch(query);
            onClose();
          }}
        >
          Search
        </button>

        <button className="tool-cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
