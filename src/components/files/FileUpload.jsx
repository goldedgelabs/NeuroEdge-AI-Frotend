import React from "react";

export default function FileUpload({ onFiles }) {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    onFiles(files);
  };

  return (
    <div className="vision-panel">
      <label className="vision-upload">
        <input
          type="file"
          multiple
          hidden
          onChange={handleFiles}
        />
        📂 Upload files
      </label>
    </div>
  );
}
