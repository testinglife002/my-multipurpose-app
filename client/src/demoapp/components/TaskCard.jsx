// ✅ TaskCard.jsx
import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onDragStart, onDrop, onClick, isDragging, isDarkMode }) => {
  return (
    <div
      className={`task-card ${isDragging ? "dragging" : ""} ${isDarkMode ? "dark" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragOver={(e) => e.preventDefault()} // allow drop
      onDrop={(e) => onDrop && onDrop(e, task.id)}
      onClick={onClick}
    >
      <div className="task-title">{task.title}</div>
      {task.priority && <div className={`task-priority priority-${task.priority.toLowerCase()}`}>{task.priority}</div>}
      {task.assignees && task.assignees.length > 0 && (
        <div className="task-assignees">
          {task.assignees.map((a, idx) => (
            <span key={idx} className="assignee-avatar">{a[0]}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
