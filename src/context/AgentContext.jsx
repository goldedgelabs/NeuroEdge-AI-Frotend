import React, { createContext, useCallback, useState } from "react";
import runAgentChain from "../hooks/useAgentEngine";

export const AgentContext = createContext();

const defaultAgents = [
  { id: "researcher", name: "Researcher", description: "Deep research & sourcing" },
  { id: "writer", name: "Writer", description: "Creative long-form writing" },
  { id: "coder", name: "Coder", description: "Code generation & analysis" },
  { id: "analyst", name: "Analyst", description: "Structured summaries & insights" },
];

export const AgentProvider = ({ children }) => {
  const [agents] = useState(defaultAgents);
  const [currentAgent, setCurrentAgent] = useState(defaultAgents[0]);
  const [reasoningTrace, setReasoningTrace] = useState([]); // array of steps/blocks
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ step: 0, total: 0 });

  const setAgent = (id) => {
    const a = agents.find((x) => x.id === id) || defaultAgents[0];
    setCurrentAgent(a);
  };

  const clearReasoning = () => {
    setReasoningTrace([]);
    setProgress({ step: 0, total: 0 });
  };

  // Run an agent chain. input: { prompt, tools, options }
  const runAgent = useCallback(
    async (input, onUpdate = () => {}) => {
      setRunning(true);
      setReasoningTrace([]);
      setProgress({ step: 0, total: 0 });

      try {
        await runAgentChain({
          agent: currentAgent,
          input,
          onStep: (step, i, total) => {
            setReasoningTrace((s) => [...s, { ...step, index: i }]);
            setProgress({ step: i + 1, total });
            onUpdate(step, i, total);
          },
        });
      } catch (err) {
        console.error("Agent run error:", err);
      } finally {
        setRunning(false);
      }
    },
    [currentAgent]
  );

  return (
    <AgentContext.Provider
      value={{
        agents,
        currentAgent,
        setAgent,
        reasoningTrace,
        clearReasoning,
        runAgent,
        running,
        progress,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};
