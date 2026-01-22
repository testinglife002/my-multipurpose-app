// ✅ Converted ChatPanel.jsx
import React, { useState, useRef, useEffect } from "react";
import "./ChatPanel.css";

const ChatPanel = ({
  messages,
  users,
  currentUser,
  onSendMessage,
  isDarkMode
}) => {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = e => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
  };

  const getUser = id => users.find(u => u.id === id);

  return (
    <aside className={`chat-panel ${isDarkMode ? "dark" : ""}`}>
      <div className="chat-header">
        <h3>Team Chat</h3>
      </div>

      <div className="chat-messages custom-scrollbar">
        {messages.map(msg => {
          const user = getUser(msg.userId);
          const isMe = msg.userId === currentUser.id;

          return (
            <div
              key={msg.id}
              className={`chat-message ${isMe ? "me" : ""}`}
            >
              <div className="chat-avatar">
                {user?.name?.charAt(0)}
              </div>

              <div className="chat-bubble">
                <div className="chat-meta">
                  <span className="chat-user">{user?.name}</span>
                  <span className="chat-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="chat-text">{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">➤</button>
      </form>
    </aside>
  );
};

export default ChatPanel;
