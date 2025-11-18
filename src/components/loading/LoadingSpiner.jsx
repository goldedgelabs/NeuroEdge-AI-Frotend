import React from "react";
import "./loading.css";

export default function LoadingSpinner({ size = 38 }) {
  return (
    <div
      className="loading-spinner"
      style={{ width: size, height: size }}
    ></div>
  );
}
