import React, { useState } from 'react';
import { USERS, STAGES } from '../../data/mockData';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { X, Calendar, Flag, CheckSquare, Paperclip, MessageSquare, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import './TaskOverlay.css';
export function TaskOverlay({
  task,
  onClose,
  onUpdate
}) {
  const [editedTask, setEditedTask] = useState({
    ...task
  });
  const [newComment, setNewComment] = useState('');
  const [isSubtasksExpanded, setIsSubtasksExpanded] = useState(true);
  const handleSave = () => {
    onUpdate(editedTask);
    onClose();
  };
  const toggleSubtask = subTaskId => {
    const updatedSubtasks = editedTask.subTasks.map(st => st.id === subTaskId ? {
      ...st,
      completed: !st.completed
    } : st);
    setEditedTask({
      ...editedTask,
      subTasks: updatedSubtasks
    });
  };
  return <div className="overlay-backdrop">
      <div className="overlay-modal" role="dialog" aria-modal="true">
        <div className="overlay-header">
          <div className="header-left">
            <Badge variant={editedTask.status === 'done' ? 'success' : 'secondary'}>
              {editedTask.status.toUpperCase()}
            </Badge>
            <span className="task-id">#{editedTask.id}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="icon" />
          </Button>
        </div>

        <div className="overlay-content">
          <div className="title-section">
            <input type="text" value={editedTask.title} onChange={e => setEditedTask({
            ...editedTask,
            title: e.target.value
          })} className="title-input" placeholder="Task Title" />
            <textarea value={editedTask.description} onChange={e => setEditedTask({
            ...editedTask,
            description: e.target.value
          })} className="description-input" placeholder="Add a description..." />
          </div>

          <div className="properties-grid">
            <div className="grid-column">
              <div className="property-group">
                <label className="property-label">Stage</label>
                <Select value={editedTask.stage} onChange={e => setEditedTask({
                ...editedTask,
                stage: e.target.value
              })} options={STAGES.map(s => ({
                value: s,
                label: s
              }))} />
              </div>
              <div className="property-group">
                <label className="property-label">Priority</label>
                <div className="priority-select-wrapper">
                  <Flag className={`icon-sm priority-${editedTask.priority}`} />
                  <Select value={editedTask.priority} onChange={e => setEditedTask({
                  ...editedTask,
                  priority: e.target.value
                })} options={['low', 'medium', 'high', 'urgent'].map(p => ({
                  value: p,
                  label: p.charAt(0).toUpperCase() + p.slice(1)
                }))} />
                </div>
              </div>
            </div>

            <div className="grid-column">
              <div className="property-group">
                <label className="property-label">Dates</label>
                <div className="date-inputs">
                  <Calendar className="icon-sm text-gray-400" />
                  <div className="date-range">
                    <input type="date" value={editedTask.startDate} onChange={e => setEditedTask({
                    ...editedTask,
                    startDate: e.target.value
                  })} className="date-input" />
                    <span className="date-arrow">→</span>
                    <input type="date" value={editedTask.dueDate} onChange={e => setEditedTask({
                    ...editedTask,
                    dueDate: e.target.value
                  })} className="date-input" />
                  </div>
                </div>
              </div>
              <div className="property-group">
                <label className="property-label">Assignees</label>
                <div className="assignees-list">
                  {editedTask.assignees.map(id => {
                  const user = USERS.find(u => u.id === id);
                  return user ? <Avatar key={id} src={user.avatar} alt={user.name} className="assignee-avatar" /> : null;
                })}
                  <button className="add-assignee-btn">+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="subtasks-section">
            <div className="subtasks-header" onClick={() => setIsSubtasksExpanded(!isSubtasksExpanded)}>
              <h3 className="subtasks-title">
                {isSubtasksExpanded ? <ChevronDown className="icon-sm" /> : <ChevronRight className="icon-sm" />}
                Subtasks (
                {editedTask.subTasks.filter(t => t.completed).length}/
                {editedTask.subTasks.length})
              </h3>
              <Button variant="ghost" size="sm" className="add-subtask-btn">
                + Add Subtask
              </Button>
            </div>

            {isSubtasksExpanded && <div className="subtasks-list">
                {editedTask.subTasks.map(st => <div key={st.id} className="subtask-item">
                    <button onClick={() => toggleSubtask(st.id)} className={`checkbox ${st.completed ? 'checked' : ''}`}>
                      {st.completed && <CheckSquare className="icon-xs" />}
                    </button>
                    <span className={`subtask-text ${st.completed ? 'completed' : ''}`}>
                      {st.title}
                    </span>
                    <Button variant="ghost" size="icon" className="delete-subtask">
                      <Trash2 className="icon-xs" />
                    </Button>
                  </div>)}
                {editedTask.subTasks.length === 0 && <p className="empty-subtasks">No subtasks yet.</p>}
              </div>}
          </div>

          <div className="footer-section">
            <div className="meta-info">
              <button className="meta-btn">
                <Paperclip className="icon-sm" />3 Attachments
              </button>
              <button className="meta-btn">
                <MessageSquare className="icon-sm" />
                {editedTask.comments.length} Comments
              </button>
            </div>

            <div className="comment-input-wrapper">
              <Avatar alt="Me" fallback="ME" size="sm" />
              <div className="input-container">
                <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." className="comment-input" />
              </div>
            </div>
          </div>
        </div>

        <div className="overlay-footer">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>;
}