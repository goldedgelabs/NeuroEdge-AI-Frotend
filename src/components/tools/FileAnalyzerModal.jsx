import React, { useState } from "react";
import Modal from "../ui/Modal";

/**
 * FileAnalyzerModal
 * Frontend-only UI: accepts file uploads, extracts text locally (basic), and shows summary.
 */
export default function FileAnalyzerModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleFile = async (f) => {
    setFile(f);
    setSummary("");
    setText("");

    // try reading as text (pdf not supported without library; we simulate)
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = String(e.target.result || "");
      setText(content.slice(0, 20000)); // limit
      setSummary(`Extracted ${Math.min(content.length, 20000)} chars (simulated).`);
    };
    // if text-like file, read as text; else read as data url then simulate
    if (f.type.startsWith("text/") || f.type === "application/json") {
      reader.readAsText(f);
    } else {
      reader.readAsDataURL(f);
      reader.onload = () => {
        setText("[Binary data - preview not available in this demo]");
        setSummary("Binary file received. Use GoldEdge engine to analyze binary files.");
      };
    }
  };

  const handleAnalyze = () => {
    // Simulated analysis: produce key points from text
    if (!text && !file) {
      setSummary("No file to analyze.");
      return;
    }
    // Simple extraction: first sentences as summary
    const snippet = text ? text.slice(0, 800) : "";
    const bullets = snippet ? snippet.split(".").slice(0, 4).map(s => s.trim()).filter(Boolean) : [];
    setSummary(`Key points:\n- ${bullets.join("\n- ")}`);
  };

  return (
    <Modal title="File Analyzer" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label className="ne-input-label">Upload file</label>
          <input type="file" onChange={(e) => handleFile(e.target.files?.[0])} />
          {file && <div className="ne-file-meta">Selected: {file.name} • {file.type || "unknown"}</div>}
        </div>

        <div>
          <button className="ne-tool-cta" onClick={handleAnalyze}>Analyze</button>
        </div>

        <div className="ne-tool-output">
          <h4>Summary</h4>
          <pre style={{ whiteSpace: "pre-wrap" }}>{summary || "No summary yet."}</pre>
        </div>

        <div className="ne-tool-output">
          <h4>Raw preview</h4>
          <div style={{ maxHeight: 160, overflow: "auto", background: "rgba(0,0,0,0.4)", padding: 10, borderRadius: 8 }}>
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{text || "[No preview]"}</pre>
          </div>
        </div>
      </div>
    </Modal>
  );
      }
