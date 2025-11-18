import React, { useContext } from "react";

import { ChatProvider } from "./context/ChatContext";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import MessageList from "./components/chat/MessageList";
import ChatInput from "./components/chat/ChatInput";
import ReasoningDrawer from "./components/layout/ReasoningDrawer";

import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/chatinput.css";
import "./styles/menu.css";
import "./styles/modal.css";
import "./styles/animations.css";

function Shell() {
  const { messages, sendMessage, isTyping } = useContext(require("./context/ChatContext").ChatContext);

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-column">
        <TopBar />

        <div className="chat-area">
          <MessageList messages={messages} isTyping={isTyping} />
        </div>

        <ChatInput onSendText={sendMessage} />
      </div>

      <ReasoningDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ChatProvider>
          <Shell />
        </ChatProvider>
      </AppProvider>
    </AuthProvider>
  );
}
