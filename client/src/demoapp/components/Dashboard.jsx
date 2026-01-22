// ✅ Converted Dashboard.jsx
import React from "react";
import "./Dashboard.css";

const Dashboard = ({ state, onSelectBoard }) => {
  const { boards, users } = state;

  const totalTasks = boards.reduce(
    (sum, b) => sum + b.columns.reduce((s, c) => s + c.tasks.length, 0),
    0
  );

  return (
    <div className="dashboard">
      {/* ===== STATS ===== */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Boards</h4>
          <p>{boards.length}</p>
        </div>

        <div className="stat-card">
          <h4>Total Tasks</h4>
          <p>{totalTasks}</p>
        </div>

        <div className="stat-card">
          <h4>Team Members</h4>
          <p>{users.length}</p>
        </div>
      </div>

      {/* ===== BOARDS ===== */}
      <div className="dashboard-section">
        <h3>Your Boards</h3>

        <div className="board-grid">
          {boards.map(board => (
            <div
              key={board.id}
              className="board-card"
              onClick={() => onSelectBoard(board.id)}
            >
              <h4>{board.title}</h4>
              <p>{board.columns.length} Lists</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

