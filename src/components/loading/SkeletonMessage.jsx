import React from "react";
import "./loading.css";

export default function SkeletonMessage() {
  return (
    <div className="skeleton-message">
      <div className="bubble skeleton"></div>
      <div className="bubble skeleton short"></div>
      <div className="bubble skeleton"></div>
    </div>
  );
}
