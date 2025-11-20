import React, { createContext, useContext, useState } from "react";

const AgentContext = createContext();
export const useAgent = () => useContext(AgentContext);

export const AgentProvider = ({ children }) => {
  const [reasoningTrace, setReasoningTrace] = useState([]);
  const [agentStatus, setAgentStatus] = useState("idle"); // idle | thinking | error

  const addTrace = (step) => {
    setReasoningTrace((prev) => [...prev, step]);
  };

  const clearTrace = () => {
    setReasoningTrace([]);
  };

  const value = {
    reasoningTrace,
    addTrace,
    clearTrace,
    agentStatus,
    setAgentStatus,
  };

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
};
