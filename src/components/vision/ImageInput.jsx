import React from "react";

export default function ImageInput({ onSelect }) {
  return (
    <div className="vision-panel">
      <label className="vision-upload">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onSelect(e.target.files[0])}
        />
        📸 Click to upload an image
      </label>
    </div>
  );
}
