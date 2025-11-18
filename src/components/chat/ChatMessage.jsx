import React from "react";
import ReasoningGraph from "../reasoning/ReasoningGraph";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`w-full flex mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-gold-400 to-gold-600 text-black"
            : "bg-white/15 backdrop-blur-xl border border-white/10 text-white"
        }`}
      >
        {/* Message text */}
        <div className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>

        {/* ⭐ Reasoning Graph added here */}
        {message.reasoning && (
          <div className="mt-3">
            <ReasoningGraph reasoning={message.reasoning} />
          </div>
        )}
      </div>
    </div>
  );
        }
