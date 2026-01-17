import React from 'react';
import TaskCard from './TaskCard.jsx';

export default function Column({ stage, tasks, onEditTask, onCreateTask }) {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          {stage} <span className="count-badge">{tasks.length}</span>
        </div>
        <button className="icon-btn-small" onClick={onCreateTask}>
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onEditTask(task)} />
        ))}
        {tasks.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <p>No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
}