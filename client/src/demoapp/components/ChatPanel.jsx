// ✅ Converted ChatPanel.jsx
import React, { useState, useRef, useEffect, useMemo } from "react";

const ChatPanel = ({ messages, users, currentUser, onSendMessage, isDarkMode }) => {
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  const getUser = (id) => users.find((u) => u.id === id);

  const globalActivities = useMemo(
    () => [
      { id: "ga1", userId: "u2", action: "moved Design Landing Page to Done" },
      { id: "ga2", userId: "u3", action: "added a new attachment to API Integration" },
      { id: "ga3", userId: "u1", action: "started collaborative canvas" },
    ],
    []
  );

  return (
    <div className={`chat-panel ${isDarkMode ? "dark" : ""}`}>
      <style>{`
        .chat-panel {
          width: 320px;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-left: 1px solid #e2e8f0;
          background: #ffffff;
          z-index: 20;
        }
        .chat-panel.dark {
          background: #020617;
          border-color: #1e293b;
          color: #e5e7eb;
        }

        .chat-header {
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .dark .chat-header {
          border-color: #1e293b;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: .4; }
          100% { opacity: 1; }
        }

        .tabs {
          display: flex;
          padding: 4px;
          border-radius: 12px;
          background: #f1f5f9;
        }
        .dark .tabs {
          background: #020617;
        }

        .tab {
          flex: 1;
          padding: 6px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
          border-radius: 10px;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #94a3b8;
        }

        .tab.active {
          background: #ffffff;
          color: #4f46e5;
          box-shadow: 0 1px 4px rgba(0,0,0,.1);
        }

        .dark .tab.active {
          background: #4f46e5;
          color: white;
        }

        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .message-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .message {
          max-width: 90%;
          padding: 10px 14px;
          font-size: 14px;
          border-radius: 18px;
        }

        .me {
          align-self: flex-end;
          background: #4f46e5;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .other {
          align-self: flex-start;
          background: #f1f5f9;
          color: #020617;
          border-bottom-left-radius: 4px;
        }

        .dark .other {
          background: #1e293b;
          color: #e5e7eb;
        }

        .system {
          font-size: 12px;
          padding: 12px;
          border-radius: 16px;
          background: rgba(79,70,229,.15);
          color: #6366f1;
          border: 1px solid rgba(79,70,229,.3);
        }

        .user-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
        }

        .avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        .activity {
          display: flex;
          gap: 12px;
        }

        .activity img {
          width: 32px;
          height: 32px;
          border-radius: 10px;
        }

        .chat-input {
          padding: 16px;
          border-top: 1px solid #e2e8f0;
        }

        .dark .chat-input {
          border-color: #1e293b;
        }

        .input-wrapper {
          position: relative;
        }

        .input {
          width: 100%;
          padding: 12px 48px 12px 16px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
        }

        .dark .input {
          background: #020617;
          border-color: #1e293b;
          color: white;
        }

        .send-btn {
          position: absolute;
          right: 8px;
          top: 8px;
          background: #4f46e5;
          color: white;
          border-radius: 12px;
          border: none;
          padding: 6px 10px;
          cursor: pointer;
        }
      `}</style>

      {/* Header */}
      <div className="chat-header">
        <div className="header-title">
          <span className="pulse-dot" />
          Board Central
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === "chat" ? "active" : ""}`} onClick={() => setActiveTab("chat")}>
            CHAT
          </button>
          <button className={`tab ${activeTab === "activity" ? "active" : ""}`} onClick={() => setActiveTab("activity")}>
            ACTIVITY
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="chat-body" ref={scrollRef}>
        {activeTab === "chat" ? (
          <div className="message-group">
            {messages.map((msg, idx) => {
              const user = getUser(msg.userId);
              const isMe = msg.userId === currentUser.id;
              const showUser = idx === 0 || messages[idx - 1].userId !== msg.userId;

              if (msg.isSystem) {
                return <div key={msg.id} className="system">🤖 {msg.text}</div>;
              }

              return (
                <div key={msg.id} className={`message ${isMe ? "me" : "other"}`}>
                  {!isMe && showUser && (
                    <div className="user-label">
                      <img src={user?.avatar} className="avatar" />
                      {user?.name}
                    </div>
                  )}
                  {msg.text}
                </div>
              );
            })}
          </div>
        ) : (
          globalActivities.map((act) => {
            const user = getUser(act.userId);
            return (
              <div key={act.id} className="activity">
                <img src={user?.avatar} />
                <p>
                  <strong>{user?.name}</strong> {act.action}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      {activeTab === "chat" && (
        <div className="chat-input">
          <form onSubmit={handleSend} className="input-wrapper">
            <input
              className="input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message team..."
            />
            <button className="send-btn">🚀</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
