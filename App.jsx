import React, { useContext, useEffect, useState } from "react";
import { UIProvider, UIContext } from "./context/UIContext";
import { AgentProvider, AgentContext } from "./context/AgentContext";
import { ChatProvider, ChatContext } from "./context/ChatContext";
import { ToolsProvider } from "./context/ToolsContext";
import { ThemeProvider } from "./context/ThemeContext";

import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import ReasoningDrawer from "./components/layout/ReasoningDrawer";
import ToolsMenu from "./components/tools/ToolsMenu";
import ToolModal from "./components/tools/ToolModal";
import ChatWindow from "./components/chat/ChatWindow";

import "./styles/globals.css";
import "./components/layout/TopBar.css";
import "./components/layout/Sidebar.css";
import "./components/layout/ThreeDots.css";
import "./components/chat/Chat.css";
import "./components/tools/Tools.css";
import "./components/ui/modal.css";
import "./components/layout/ReasoningDrawer.css";
import "./components/agents/agents.css";

export default function AppShell() {
  return (
    <ThemeProvider>
      <UIProvider>
        <ToolsProvider>
          <AgentProvider>
            <ChatProvider>
              <Shell />
            </ChatProvider>
          </AgentProvider>
        </ToolsProvider>
      </UIProvider>
    </ThemeProvider>
  );
}

function Shell() {
  const { activeConversation, addMessageTo } = useContext(ChatContext);
  const { currentAgent, runAgent } = useContext(AgentContext);
  const { selectedTool } = useContext(UIContext);

  const [isTyping, setIsTyping] = useState(false);

  // onSend — user sends message; append to conversation and trigger agent run
  const handleSend = async (text) => {
    const conv = activeConversation;
    if (!conv) return;

    const userMsg = { id: `m_${Date.now()}`, role: "user", content: text };
    addMessageTo(conv.id, userMsg);

    // set typing and run agent
    setIsTyping(true);

    // run agent chain, on each step we can optionally append a trace message
    await runAgent(
      { prompt: text },
      (step, i, total) => {
        // optionally show intermediate assistant messages (we will append last result only)
        // If you want streaming partials, patch runAgentChain to yield partial outputs.
      }
    );

    // After agent finishes, append a final assistant message (simulated or real)
    const assistantMsg = {
      id: `m_${Date.now()}_a`,
      role: "assistant",
      content: `(${currentAgent.name}) Simulated response to: "${text}"`,
    };
    addMessageTo(conv.id, assistantMsg);

    setIsTyping(false);
  };

  return (
    <div className="app-shell" style={{ display: "flex", height: "100vh", gap: 18, padding: 18 }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <TopBar />
        <div style={{ flex: 1, minHeight: 0 }}>
          <ChatWindow messages={(activeConversation && activeConversation.messages) || []} onSend={handleSend} isTyping={isTyping} />
        </div>
      </div>

      <ToolsMenu />
      <ToolModal />
      <ReasoningDrawer />
    </div>
  );
  }
