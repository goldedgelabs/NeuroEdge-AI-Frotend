import React, { useContext } from "react";
import { AgentContext } from "../../context/AgentContext";
import { UIContext } from "../../context/UIContext";
import StepProgress from "../agents/StepProgress";
import AgentReasoningGraph from "../agents/AgentReasoningGraph";

import "./ReasoningDrawer.css";

export default function ReasoningDrawer() {
  const { reasoningDrawerOpen, toggleReasoningDrawer } = useContext(UIContext);
  const { reasoningTrace, clearReasoning, progress, currentAgent } = useContext(AgentContext);

  // ---- Build Graph Nodes/Edges Safely ----
  const nodes =
    reasoningTrace?.map((r, i) => ({
      id: `n${i}`,
      label: r.label,
      type: i === reasoningTrace.length - 1 ? "result" : "thought",
    })) || [];

  const edges =
    nodes.length > 1
      ? nodes.slice(1).map((n, i) => ({
          from: nodes[i].id,
          to: n.id,
        }))
      : [];

  return (
    <aside
      className={`reasoning-drawer ${reasoningDrawerOpen ? "open" : ""}`}
      aria-hidden={!reasoningDrawerOpen}
    >
      <div className="drawer-head">
        <div>
          <h3>Agent Reasoning</h3>
          <div className="drawer-sub">{currentAgent?.name}</div>
        </div>

        <div className="drawer-actions">
          <button onClick={clearReasoning}>Clear</button>
          <button onClick={toggleReasoningDrawer}>Close</button>
        </div>
      </div>

      <div className="drawer-body">
        <StepProgress steps={reasoningTrace} progress={progress} />

        {/* Graph */}
        {reasoningTrace.length > 0 && (
          <div className="reasoning-graph-wrapper">
            <AgentReasoningGraph nodes={nodes} edges={edges} />
          </div>
        )}

        {/* List */}
        {reasoningTrace.length === 0 ? (
          <div className="empty">
            No reasoning steps yet. Run an agent to see its chain.
          </div>
        ) : (
          <div className="trace-list">
            {reasoningTrace.map((s, idx) => (
              <div className="trace-step" key={idx}>
                <div className="trace-header">
                  <div className="trace-index">Step {idx + 1}</div>
                  <div className="trace-label">{s.label}</div>
                </div>
                <div className="trace-body">{s.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
        }
