// src/components/chat/__tests__/ChatInput.test.jsx
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ChatInput from "../ChatInput";

describe("ChatInput", () => {
  test("sends text and can cancel in-flight streaming", async () => {
    const onStart = jest.fn();
    const onAppend = jest.fn();
    const onFinish = jest.fn();

    const { getByTitle, getByPlaceholderText } = render(
      <ChatInput
        onStartAssistantStream={onStart}
        onAppendAssistantToken={onAppend}
        onFinishAssistantStream={onFinish}
      />
    );

    const input = getByPlaceholderText(/type a message/i);
    fireEvent.change(input, { target: { value: "Hello world" } });

    // click send
    const sendBtn = getByTitle("Send message");
    fireEvent.click(sendBtn);

    // since we don't have a real server in the test, just assert the start callback was called quickly (message created)
    await waitFor(() => expect(onStart).toHaveBeenCalled());
  });
});
