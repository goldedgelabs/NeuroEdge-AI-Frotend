// src/components/layout/ThreeDots.jsx
import React, { useEffect, useState } from "react";
import "../../styles/chatinput.css";

/**
 * ThreeDots - connection indicator
 * props:
 *   status: "online" | "reconnecting" | "offline"
 *
 * Behavior:
 *  - Online: green steady blink
 *  - Reconnecting: yellow slower blink
 *  - Offline: red slow blink
 */
export default function ThreeDots({ status = "offline" }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let interval;
    if (status === "online") interval = setInterval(() => setPhase((p) => (p + 1) % 3), 400);
    if (status === "reconnecting") interval = setInterval(() => setPhase((p) => (p + 1) % 3), 700);
    if (status === "offline") interval = setInterval(() => setPhase((p) => (p + 1) % 3), 900);
    return () => clearInterval(interval);
  }, [status]);

  const colorMap = {
    online: "#39d353", // green
    reconnecting: "#ffcc00", // yellow
    offline: "#ff4d4f", // red
  };

  const dotClass = (i) => {
    const visible = i === phase;
    return `dot ${visible ? "dot-on" : "dot-off"}`;
  };

  return (
    <div className="three-dots">
      <span className={dotClass(0)} style={{ background: colorMap[status] }} />
      <span className={dotClass(1)} style={{ background: colorMap[status] }} />
      <span className={dotClass(2)} style={{ background: colorMap[status] }} />
    </div>
  );
    }
