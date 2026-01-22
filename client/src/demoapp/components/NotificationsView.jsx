// 🔹 3️⃣ NotificationsView.jsx
import "./notifications.css";
import React from "react";

const NotificationsView = ({ notifications, markAllRead, isDarkMode }) => {
  return (
    <div className={`notify-wrapper ${isDarkMode ? "dark" : ""}`}>
      <header className="notify-header">
        <h1>Notifications</h1>
        <button onClick={markAllRead}>Mark all as read</button>
      </header>

      <div className="notify-list">
        {notifications.map(n => (
          <div key={n.id} className={`notify-card ${!n.read ? "unread" : ""}`}>
            <div className="notify-icon">{n.title.includes("Comment") ? "💬" : "📋"}</div>
            <div>
              <h3>{n.title}</h3>
              <p>{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
