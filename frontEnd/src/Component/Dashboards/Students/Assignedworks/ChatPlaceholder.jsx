import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatPlaceholder = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋", sender: "bot" },
    { id: 2, text: "Hello! How are you?", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");
  };

 return (
    <div className="flex flex-col h-[90vh]  w-full min-w-[20%]  mt-[-15px] max-w-[70%]  mx-auto border rounded-2xl shadow-lg bg-white">
      {/* Header */}
      <div className="bg-blue-500 text-white text-lg font-semibold p-4 rounded-t-2xl">
        Chat Box
      </div>

      {/* Messages Section */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="p-3 border-t flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatPlaceholder
