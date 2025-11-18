import React, { useState } from "react";
import ToolCard from "./ToolCard";
import ToolModal from "./ToolModal";
import "./Tools.css";

export default function ToolsMenu() {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    {
      id: "web-search",
      name: "Web Search",
      description: "Search the web using GoldEdge enhanced engine.",
      icon: "🔍",
    },
    {
      id: "file-input",
      name: "File Input",
      description: "Upload PDFs, images, or documents.",
      icon: "📁",
    },
    {
      id: "code-runner",
      name: "Code Runner",
      description: "Execute code in a sandboxed environment (frontend placeholder).",
      icon: "💻",
    },
    {
      id: "vision",
      name: "Vision",
      description: "Image understanding and OCR.",
      icon: "🖼️",
    },
  ];

  return (
    <div className="tools-menu">
      <h3 className="tools-title">Tools</h3>

      <div className="tools-grid">
        {tools.map((t) => (
          <ToolCard
            key={t.id}
            tool={t}
            onClick={() => setActiveTool(t)}
          />
        ))}
      </div>

      {activeTool && (
        <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
      )}
    </div>
  );
}
