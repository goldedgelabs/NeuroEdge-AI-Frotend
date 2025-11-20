import React from "react";
import { useUI } from "../../context/UIContext";

export default function FloatingChat() {
  const { showFloatingChat, toggleFloatingChat } = useUI();

  if (!showFloatingChat) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-80 h-96 bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl border border-neutral-300 dark:border-neutral-700 p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">NeuroEdge Assistant</h2>

          <button
            onClick={toggleFloatingChat}
            className="text-red-500 hover:text-red-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="h-64 overflow-y-auto p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <p className="text-neutral-500 text-sm">
            NeuroEdge is ready to help. Ask anything or scan this page.
          </p>
        </div>

        <input
          placeholder="Ask NeuroEdge…"
          className="w-full mt-3 px-3 py-2 border rounded-lg bg-neutral-50 dark:bg-neutral-700"
        />
      </div>
    </div>
  );
}
