import React from "react";
import "./modal.css";

/**
 * Basic Modal wrapper used by tool modals.
 * Props:
 *  - title
 *  - onClose
 *  - children
 */
export default function Modal({ title, onClose, children }) {
  return (
    <div className="ne-modal-backdrop" role="dialog" aria-modal="true">
      <div className="ne-modal">
        <div className="ne-modal-header">
          <h3>{title}</h3>
          <button className="ne-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="ne-modal-body">{children}</div>
      </div>
    </div>
  );
}
