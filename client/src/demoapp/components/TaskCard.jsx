// ✅ TaskCard.jsx
import React from 'react';
import { Priority } from '../types.js';

const TaskCard = ({ task, users, onDragStart, onClick, onDelete, isDragging, isDarkMode }) => {
  const priorityColors = {
    [Priority.URGENT]: '#e11d48',
    [Priority.HIGH]: '#f59e0b',
    [Priority.MEDIUM]: '#3b82f6',
    [Priority.LOW]: '#10b981'
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={onClick}
      style={{
        padding: 16,
        borderRadius: 16,
        background: isDarkMode ? '#1e293b' : '#ffffff',
        border: '1px solid #e5e7eb',
        cursor: 'grab',
        opacity: isDragging ? 0.4 : 1,
        transform: isDragging ? 'scale(0.95)' : 'scale(1)',
        transition: 'all .2s'
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: '#fff',
          background: priorityColors[task.priority],
          padding: '4px 8px',
          borderRadius: 8,
          display: 'inline-block'
        }}
      >
        {task.priority}
      </div>

      <h4 style={{ margin: '10px 0', fontSize: 14 }}>{task.title}</h4>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
        <span style={{ fontSize: 10 }}>📅 {task.dueDate}</span>
        <div style={{ display: 'flex', gap: -8 }}>
          {task.assignees.map(id => {
            const u = users.find(x => x.id === id);
            return (
              <img
                key={id}
                src={u?.avatar}
                alt=""
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 8,
                  border: '2px solid white'
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
