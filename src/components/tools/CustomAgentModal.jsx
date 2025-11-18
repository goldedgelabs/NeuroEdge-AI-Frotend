import React, { useContext, useState } from "react";
import Modal from "../ui/Modal";
import { AgentContext } from "../../context/AgentContext";

/**
 * CustomAgentModal:
 * Allows creating/updating a simple custom agent preset (frontend-only).
 * Saves locally into AgentContext.agents if you later expand.
 */
export default function CustomAgentModal({ onClose }) {
  const { agents, setAgent } = useContext(AgentContext);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleCreate = () => {
    // For now, just console log. In future can push to AgentContext.
    console.log("Create custom agent:", { name, desc });
    alert("Custom agent creation is simulated. It will be wired to backend in Phase C+.");
    onClose();
  };

  return (
    <Modal title="Custom Agent" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label className="ne-input-label">Agent display name</label>
        <input className="ne-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Legal Researcher" />

        <label className="ne-input-label">Short description</label>
        <input className="ne-input" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Persona description" />

        <div style={{ display: "flex", gap: 10 }}>
          <button className="ne-tool-cta" onClick={handleCreate}>Create</button>
          <button className="ne-tool-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
      }
