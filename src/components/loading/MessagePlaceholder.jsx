import React from "react";
import "../../styles/loading.css";

export default function MessagePlaceholder() {
  return (
    <div className="placeholder">
      <div className="placeholder-line short"></div>
      <div className="placeholder-line"></div>
      <div className="placeholder-line medium"></div>
    </div>
  );
}
