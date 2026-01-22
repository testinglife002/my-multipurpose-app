// ✅ Converted TopBar.jsx (Tailwind → Custom CSS)
import React from "react";
import "./TopBar.css";

const TopBar = ({
  activeBoard,
  activeView,
  setActiveView,
  toggleChat,
  toggleDarkMode,
  isDarkMode
}) => {
  return (
    <header className={`demoapp-topbar ${isDarkMode ? "dark" : ""}`}>
        
      <div className="topbar-left">
        {activeView === "board" && activeBoard && (
          <>
            <h2 className="topbar-title">{activeBoard.title}</h2>
            <span className="topbar-badge">
              {activeBoard.columns.length} Lists
            </span>
          </>
        )}

        {activeView === "dashboard" && (
          <h2 className="topbar-title">Dashboard</h2>
        )}

        {activeView === "team" && (
          <h2 className="topbar-title">Team</h2>
        )}

        {activeView === "notifications" && (
          <h2 className="topbar-title">Notifications</h2>
        )}

        {activeView === "canvas" && (
          <h2 className="topbar-title">Canvas</h2>
        )}
      </div>

      <div className="topbar-actions">
        <button
          className="topbar-btn"
          onClick={() => setActiveView("canvas")}
          title="Open Canvas"
        >
          🧠
        </button>

        <button
          className="topbar-btn"
          onClick={toggleChat}
          title="Toggle Chat"
        >
          💬
        </button>

        <button
          className="topbar-btn"
          onClick={toggleDarkMode}
          title="Toggle Dark Mode"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default TopBar;

