import React, { useState, useRef } from 'react';
import { TEAM_MEMBERS, Stage, Priority, Recurrence } from '../constants.js';

export default function TaskModal({ task, onSave, onClose, onDelete }) {
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(task)));
  const [newTag, setNewTag] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [newComment, setNewComment] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(newTag.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      }
      setNewTag('');
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setFormData(prev => ({
        ...prev,
        subTasks: [...prev.subTasks, { id: Date.now().toString(), text: newSubtask.trim(), completed: false }]
      }));
      setNewSubtask('');
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        user: 'You',
        text: newComment.trim(),
        createdAt: new Date().toISOString()
      };
      setFormData(prev => ({ ...prev, comments: [comment, ...prev.comments] }));
      setNewComment('');
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newAssets = Array.from(files).map(f => ({
        id: Math.random().toString(36).substr(2, 9),
        name: f.name,
        url: URL.createObjectURL(f),
        type: f.type
      }));
      setFormData(prev => ({ ...prev, assets: [...prev.assets, ...newAssets] }));
    }
  };

  const toggleAssignee = (id) => {
    setFormData(prev => ({
      ...prev,
      assignees: prev.assignees.includes(id) 
        ? prev.assignees.filter(a => a !== id) 
        : [...prev.assignees, id]
    }));
  };

  return (
    <div >
        <br/>
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container">
        
        <div className="modal-header">
          <div className="header-status">
            <input 
              type="checkbox" 
              checked={formData.completed} 
              onChange={(e) => setFormData(prev => ({...prev, completed: e.target.checked}))}
              className="checkbox-custom"
            />
            <span className={formData.completed ? 'status-done' : ''}>
              {formData.completed ? 'Completed' : 'Active Task'}
            </span>
          </div>
          <div className="header-actions">
            <button className="btn-icon delete" onClick={() => onDelete(formData.id)} title="Delete">
              <i className="far fa-trash-alt"></i>
            </button>
            <button className="btn-icon close" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="editor-left">
            <input
              type="text"
              name="title"
              className="title-input-large"
              placeholder="Task Title..."
              value={formData.title}
              onChange={handleInputChange}
            />

            <div className="section">
              <label className="section-label"><i className="fas fa-align-left"></i> Description</label>
              <textarea
                name="description"
                rows="4"
                className="description-area"
                placeholder="Add details for this task..."
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="section">
              <label className="section-label"><i className="fas fa-tasks"></i> Sub-tasks</label>
              <div className="subtask-list">
                {formData.subTasks.map(st => (
                  <div key={st.id} className="subtask-row">
                    <input 
                      type="checkbox" 
                      checked={st.completed} 
                      onChange={() => setFormData(prev => ({
                        ...prev, 
                        subTasks: prev.subTasks.map(item => item.id === st.id ? {...item, completed: !item.completed} : item)
                      }))} 
                    />
                    <span className={st.completed ? 'strike' : ''}>{st.text}</span>
                    <button className="btn-remove" onClick={() => setFormData(prev => ({
                      ...prev, subTasks: prev.subTasks.filter(item => item.id !== st.id)
                    }))}>&times;</button>
                  </div>
                ))}
                <div className="add-input-row">
                  <input 
                    type="text" 
                    placeholder="New sub-task..." 
                    value={newSubtask} 
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                  />
                  <button className="btn-add" onClick={handleAddSubtask}>Add</button>
                </div>
              </div>
            </div>

            <div className="section">
              <label className="section-label"><i className="far fa-comment"></i> Discussion</label>
              <div className="comment-box">
                <textarea 
                  placeholder="Share an update..." 
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="2"
                ></textarea>
                <button className="btn-post" disabled={!newComment.trim()} onClick={handleAddComment}>Post</button>
              </div>
              <div className="comments-history">
                {formData.comments.map(c => (
                  <div key={c.id} className="comment-item">
                    <div className="comment-meta"><strong>{c.user}</strong> • {new Date(c.createdAt).toLocaleDateString()}</div>
                    <div className="comment-text">{c.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="editor-right">
            <div className="sidebar-group">
              <label>Stage</label>
              <select name="stage" value={formData.stage} onChange={handleInputChange}>
                {Object.values(Stage).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="sidebar-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleInputChange}>
                {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="sidebar-group grid">
              <div>
                <label>Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
              </div>
              <div>
                <label>Due Date</label>
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} />
              </div>
            </div>

            <div className="sidebar-group">
              <label>Recurrence</label>
              <select name="recurrence" value={formData.recurrence} onChange={handleInputChange}>
                {Object.values(Recurrence).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="sidebar-group">
              <label>Team Members</label>
              <div className="assignee-selector">
                {TEAM_MEMBERS.map(member => (
                  <img 
                    key={member.id} 
                    src={member.avatar} 
                    className={`avatar-choice ${formData.assignees.includes(member.id) ? 'active' : ''}`} 
                    onClick={() => toggleAssignee(member.id)}
                    title={member.name}
                  />
                ))}
              </div>
            </div>

            <div className="sidebar-group">
              <label>Tags</label>
              <div className="tag-input-area">
                <div className="tag-cloud">
                  {formData.tags.map(tag => (
                    <span key={tag} className="modal-tag">
                      {tag} <i className="fas fa-times" onClick={() => setFormData(prev => ({...prev, tags: prev.tags.filter(t => t !== tag)}))}></i>
                    </span>
                  ))}
                </div>
                <input type="text" placeholder="Add tag..." value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={handleAddTag} />
              </div>
            </div>

            <div className="sidebar-group">
              <label>Assets</label>
              <div className="assets-grid">
                {formData.assets.map(a => (
                  <div key={a.id} className="asset-thumb" title={a.name}>
                    <i className="fas fa-file"></i>
                  </div>
                ))}
                <div className="asset-add" onClick={() => fileInputRef.current.click()}>
                  <i className="fas fa-plus"></i>
                  <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} multiple />
                </div>
              </div>
            </div>

            <button className="btn-save" onClick={() => onSave(formData)}>
              Save Task
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}