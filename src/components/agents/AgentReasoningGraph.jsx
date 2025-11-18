import React from "react";
import "./agents.css";

/**
 * AgentReasoningGraph
 * Props:
 *  - nodes: [{ id, label, type }] (type: thought/action/result)
 *  - edges: [{ from, to }]
 *
 * This component renders a simple grid/flowchart with animated nodes and edges.
 * It's frontend-only visual; replace data with AgentContext.reasoningTrace mapped to nodes.
 */
export default function AgentReasoningGraph({ nodes = [], edges = [] }) {
  // build position grid (auto layout)
  return (
    <div className="agrid">
      <div className="agrid-inner">
        {nodes.map((n, i) => (
          <div key={n.id} className={`agrid-node ${n.type || "thought"}`} style={{ gridColumn: n.col || i+1 }}>
            <div className="node-header">
              <div className="node-type">{n.type}</div>
            </div>
            <div className="node-label">{n.label}</div>
          </div>
        ))}

        {/* simple visual edges as connectors */}
        <svg className="agrid-edges" viewBox="0 0 800 200" preserveAspectRatio="none">
          {edges.map((e, i) => {
            // naive positions: nodes placed horizontally - compute based on index of nodes array
            const fromIndex = nodes.findIndex((x)=>x.id===e.from);
            const toIndex = nodes.findIndex((x)=>x.id===e.to);
            const sx = 100 + fromIndex * 160;
            const sy = 80;
            const tx = 100 + toIndex * 160;
            const ty = 80;
            const midX = (sx + tx) / 2;
            return <path key={i} d={`M${sx},${sy} C ${midX},${sy-30} ${midX},${ty+30} ${tx},${ty}`} stroke="rgba(212,175,55,0.6)" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />;
          })}
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="rgba(212,175,55,0.8)" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
              }
