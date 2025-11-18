import React, { useState } from "react";
import "./tools.css"; // uses shared tools styles and will use .file-grid styles below

export default function FileUploadGrid({ onFilesChange }) {
  const [files, setFiles] = useState([]);

  const handleDrop = (ev) => {
    ev.preventDefault();
    const list = Array.from(ev.dataTransfer.files);
    appendFiles(list);
  };

  const handleSelect = (ev) => {
    const list = Array.from(ev.target.files || []);
    appendFiles(list);
    ev.target.value = null;
  };

  const appendFiles = (list) => {
    const next = [...files, ...list];
    setFiles(next);
    onFilesChange?.(next);
  };

  const removeFile = (index) => {
    const copy = [...files];
    copy.splice(index, 1);
    setFiles(copy);
    onFilesChange?.(copy);
  };

  return (
    <div className="file-upload-grid">
      <div
        className="upload-dropzone"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("file-input-grid").click()}
      >
        <div>
          <div className="upload-icon">📁</div>
          <div className="upload-title">Drop files here or click to upload</div>
          <div className="upload-sub">PDF, PNG, JPG, TXT — preview in golden grid</div>
        </div>
        <input id="file-input-grid" type="file" multiple style={{ display: "none" }} onChange={handleSelect} />
      </div>

      <div className="file-grid">
        {files.map((f, i) => {
          const isImage = f.type.startsWith("image/");
          const [preview, setPreview] = React.useState(null);

          // generate preview for images
          if (!preview && isImage) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(f);
          }

          return (
            <div className="file-card" key={i}>
              <div className="file-thumb">
                {isImage ? <img src={preview} alt={f.name} /> : <div className="file-placeholder">{f.name.split(".").pop().toUpperCase()}</div>}
              </div>

              <div className="file-meta">
                <div className="file-name">{f.name}</div>
                <div className="file-actions">
                  <button className="btn-outline" onClick={() => alert("Simulated analyze: send to agent")}>Analyze</button>
                  <button className="btn-outline" onClick={() => removeFile(i)}>Remove</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
