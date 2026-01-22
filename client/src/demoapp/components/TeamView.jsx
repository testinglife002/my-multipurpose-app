// 🔹 5️⃣ TeamView.jsx
import "./team.css";
import React from "react";

const TeamView = ({ users, isDarkMode }) => (
  <div className={`team-wrapper ${isDarkMode ? "dark" : ""}`}>
    <div className="team-grid">
      {users.map(u => (
        <div key={u.id} className="team-card">
          <img src={u.avatar} />
          <h3>{u.name}</h3>
          <p>{u.role}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TeamView;
