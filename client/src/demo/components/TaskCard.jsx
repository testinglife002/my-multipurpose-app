import React from 'react';
import { TEAM_MEMBERS } from '../constants.js';

export default function TaskCard({ task, onClick }) {
  const completedSubtasks = task.subTasks.filter(st => st.completed).length;
  const progressPercent = task.subTasks.length > 0 
    ? Math.round((completedSubtasks / task.subTasks.length) * 100) 
    : 0;

  const assignedMembers = TEAM_MEMBERS.filter(m => task.assignees.includes(m.id));

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`} onClick={onClick}>
      <div className="card-top">
        <span className={`priority-tag ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        {task.completed && <i className="fas fa-check-circle success-icon"></i>}
      </div>

      <h3 className="card-title">{task.title || 'Untitled Task'}</h3>
      <p className="card-desc">{task.description}</p>

      {task.tags.length > 0 && (
        <div className="tag-row">
          {task.tags.map(tag => <span key={tag} className="tag-pill">#{tag}</span>)}
        </div>
      )}

      {task.subTasks.length > 0 && (
        <div className="progress-area">
          <div className="progress-text">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      )}

      <div className="card-footer">
        <div className="meta-icons">
          <span title="Due Date"><i className="far fa-calendar"></i> {task.dueDate.split('-').slice(1).join('/')}</span>
          {task.comments.length > 0 && <span title="Comments"><i className="far fa-comment"></i> {task.comments.length}</span>}
          {task.assets.length > 0 && <span title="Assets"><i className="fas fa-paperclip"></i> {task.assets.length}</span>}
        </div>

        <div className="avatar-stack">
          {assignedMembers.map(member => (
            <img key={member.id} src={member.avatar} alt={member.name} className="mini-avatar" title={member.name} />
          ))}
        </div>
      </div>
    </div>
  );
}