import React from "react";
import "../styles/global.css";

export default function History() {
  const conversations = [
    { id: 1, title: "Market Analysis", date: "2025-11-02" },
    { id: 2, title: "AI Research Summary", date: "2025-11-03" },
    { id: 3, title: "Code Generator Session", date: "2025-11-05" },
  ];

  return (
    <div className="history page">
      <h1 className="page-title">History</h1>

      {conversations.map((c) => (
        <div key={c.id} className="card" style={{ marginBottom: "16px" }}>
          <h3>{c.title}</h3>
          <p className="text-dim">{c.date}</p>
        </div>
      ))}
    </div>
  );
}
