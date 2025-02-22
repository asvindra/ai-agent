import { useState } from "react";
import { useImmer } from "use-immer";
import { createChat, sendChatMessage } from "@/api";
import { parseSSEStream } from "@/utils";
import ChatMessages from "@/components/ChatBot/ChatMessages";
import ChatInput from "@/components/ChatBot/ChatInput";
import "./Chatbot.css";
import Spinner from "../Spinner";

function Chatbot() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer([]);
  const [newMessage, setNewMessage] = useState("");

  const isLoading = messages.length && messages[messages.length - 1].loading;

  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setMessages((draft) => [
      ...draft,
      { role: "user", content: trimmedMessage },
      { role: "assistant", content: "", sources: [], loading: true },
    ]);
    setNewMessage("");

    let chatIdOrNew = chatId;
    try {
      if (!chatId) {
        const { id } = await createChat();
        setChatId(id);
        chatIdOrNew = id;
      }

      const stream = await sendChatMessage(chatIdOrNew, trimmedMessage);
      for await (const textChunk of parseSSEStream(stream)) {
        setMessages((draft) => {
          draft[draft.length - 1].content += textChunk;
        });
      }
      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
      });
    } catch (err) {
      console.log(err);
      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }

  return (
    <div className="flex w-full max-w-3xl height mx-auto px-4 relative grow flex flex-col gap-6 pt-6">
      {messages.length === 0 && (
        <div className="mt-3 font-roboto  text-blue text-xl font-light space-y-2">
          <p>👋 Welcome to Fitness AI Agent!</p>
          <p>Ask me anything about Fitness related tips.</p>
        </div>
      )}
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        className="flex-grow"
      />
      <ChatInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
        className="mt-auto"
      />
    </div>
  );
}

export default Chatbot;
