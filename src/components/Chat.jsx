import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const { targetUserId } = useParams();

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    if (!userId || !targetUserId) return;

    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => ({
        text: msg?.text,
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        userId: msg?.senderId?.userId,
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    if (userId && targetUserId) {
      fetchChatMessages();
    }
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socket.emit("joinRoom", { targetUserId, userId });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      text: messageText,
      targetUserId,
      userId,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });

    setMessageText("");
  };

  return (
    <div className="flex flex-col h-9/10 max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg">
      
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white font-bold text-center sticky top-0 z-10 rounded-t-lg">
        Chat with {targetUserId}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-100">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((message, index) => {
            const isSender = message.firstName === user.firstName && message.lastName === user.lastName;
            
            return (
              <div
                key={index}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[70%] ${
                    isSender
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none border"
                  }`}
                >
                  <p className="text-sm font-semibold">{message.firstName} {message.lastName}</p>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
