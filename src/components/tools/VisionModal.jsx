import React, { useState } from "react";
import Modal from "../ui/Modal";

/**
 * VisionModal
 * Frontend-only vision tool. Accepts image upload and shows basic info.
 */
export default function VisionModal({ onClose }) {
  const [img, setImg] = useState(null);
  const [dataUrl, setDataUrl] = useState(null);

  const loadImage = (file) => {
    setImg(file);
    const reader = new FileReader();
    reader.onload = (e) => setDataUrl(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <Modal title="Vision Tool" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input type="file" accept="image/*" onChange={(e) => loadImage(e.target.files?.[0])} />

        {dataUrl ? (
          <div style={{ display: "flex", gap: 12 }}>
            <img src={dataUrl} alt="preview" style={{ maxWidth: 240, borderRadius: 8 }} />
            <div style={{ flex: 1 }}>
              <div>Filename: {img?.name}</div>
              <div>Type: {img?.type}</div>
              <div>Size: {Math.round((img?.size || 0) / 1024)} KB</div>
              <div style={{ marginTop: 12 }}>
                <button className="ne-tool-cta" onClick={() => alert("Simulated vision analysis (replace with GoldEdge).")}>
                  Analyze Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="ne-muted">Choose an image to inspect.</div>
        )}
      </div>
    </Modal>
  );
}
