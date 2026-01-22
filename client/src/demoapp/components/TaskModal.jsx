// 🔹 4️⃣ TaskModal.jsx (modal kept identical)
import React, { useState, useMemo } from 'react';
import { Priority } from '../types.js';
// import { GoogleGenAI } from '@google/genai';

const TaskModal = ({ task, users, onClose, onSave, isDarkMode }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [activeTab, setActiveTab] = useState('details');
  const [historyFilter, setHistoryFilter] = useState('all');
  const [newComment, setNewComment] = useState('');
  const [newCheckItem, setNewCheckItem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const logActivity = (action, type, details) => {
    const activity = {
      id: 'act' + Date.now(),
      userId: 'u1',
      action,
      type,
      details,
      timestamp: Date.now()
    };
    setEditedTask(prev => ({
      ...prev,
      activities: [activity, ...(prev.activities || [])]
    }));
  };

  const handleSave = () => onSave(editedTask);

  const filteredHistory = useMemo(() => {
    if (historyFilter === 'all') return editedTask.activities || [];
    return (editedTask.activities || []).filter(a => a.type === historyFilter);
  }, [editedTask.activities, historyFilter]);

  const addComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment = {
      id: 'c' + Date.now(),
      userId: 'u1',
      text: newComment,
      timestamp: Date.now()
    };
    setEditedTask({
      ...editedTask,
      comments: [...editedTask.comments, comment]
    });
    logActivity('added a comment', 'comment', newComment);
    setNewComment('');
  };

  const addCheckItem = (e) => {
    e.preventDefault();
    if (!newCheckItem.trim()) return;
    const item = {
      id: 'ci' + Date.now(),
      text: newCheckItem,
      completed: false
    };
    setEditedTask({
      ...editedTask,
      checklist: [...(editedTask.checklist || []), item]
    });
    setNewCheckItem('');
  };

  const toggleCheckItem = (id) => {
    setEditedTask({
      ...editedTask,
      checklist: editedTask.checklist.map(i =>
        i.id === id ? { ...i, completed: !i.completed } : i
      )
    });
  };

  const handleGenerateDescription = async () => {
    if (!editedTask.title) return;
    setIsGenerating(true);

    try {
        const res = await fetch("https://my-multipurpose-app.onrender.com/api/ai/task-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTask.title })
        });

        const data = await res.json();

        if (data.text) {
        setEditedTask(prev => ({ ...prev, description: data.text }));
        logActivity("updated description using AI", "edit");
        }
    } catch (err) {
        console.error(err);
    } finally {
        setIsGenerating(false);
    }
    };


  const priorityColors = {
    [Priority.URGENT]: '#e11d48',
    [Priority.HIGH]: '#f59e0b',
    [Priority.MEDIUM]: '#3b82f6',
    [Priority.LOW]: '#10b981'
  };

  return (
    <>
      <style>{`
        .tm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.6);
          backdrop-filter: blur(12px);
          z-index: 50;
        }

        .tm-modal {
          position: fixed;
          inset: 0;
          margin: auto;
          max-width: 1100px;
          height: 90vh;
          background: ${isDarkMode ? '#020617' : '#ffffff'};
          color: ${isDarkMode ? '#ffffff' : '#0f172a'};
          border-radius: 48px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 40px 120px rgba(0,0,0,.35);
          animation: zoomIn .3s ease;
          z-index: 51;
        }

        @keyframes zoomIn {
          from { opacity: 0; transform: scale(.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .tm-header {
          padding: 32px 40px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid ${isDarkMode ? '#1e293b' : '#e5e7eb'};
        }

        .tm-tabs {
          display: flex;
          padding: 0 40px;
          border-bottom: 1px solid ${isDarkMode ? '#1e293b' : '#e5e7eb'};
          background: ${isDarkMode ? '#020617' : '#f8fafc'};
        }

        .tm-tab {
          padding: 20px 24px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .15em;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          color: #94a3b8;
        }

        .tm-tab.active {
          color: #4f46e5;
          border-bottom-color: #4f46e5;
        }

        .tm-body {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        .tm-main {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          border-right: 1px solid ${isDarkMode ? '#1e293b' : '#e5e7eb'};
        }

        .tm-side {
          width: 320px;
          padding: 40px;
          background: ${isDarkMode ? '#020617' : '#f8fafc'};
        }

        textarea, input {
          width: 100%;
          border-radius: 24px;
          border: 1px solid ${isDarkMode ? '#334155' : '#e5e7eb'};
          padding: 20px;
          background: ${isDarkMode ? '#0f172a' : '#ffffff'};
          color: inherit;
          outline: none;
        }

        .priority-btn {
          padding: 12px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          cursor: pointer;
        }

      `}</style>

      <div className="tm-overlay" onClick={onClose} />
      <div className="tm-modal">
        <div className="tm-header">
          <input
            value={editedTask.title}
            onChange={e => setEditedTask({ ...editedTask, title: e.target.value })}
            style={{ fontSize: 30, fontWeight: 900, border: 'none' }}
          />
          <button onClick={onClose}>✕</button>
        </div>

        <div className="tm-tabs">
          {['details', 'checklist', 'comments', 'history'].map(tab => (
            <div
              key={tab}
              className={`tm-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="tm-body">
          <div className="tm-main">
            {activeTab === 'details' && (
              <>
                <button onClick={handleGenerateDescription}>
                  {isGenerating ? 'Writing…' : '✨ AI Rewrite'}
                </button>
                <textarea
                  rows={12}
                  value={editedTask.description}
                  onChange={e => setEditedTask({ ...editedTask, description: e.target.value })}
                />
              </>
            )}

            {activeTab === 'checklist' && (
              <>
                {(editedTask.checklist || []).map(i => (
                  <div key={i.id}>
                    <input type="checkbox" checked={i.completed} onChange={() => toggleCheckItem(i.id)} />
                    {i.text}
                  </div>
                ))}
                <form onSubmit={addCheckItem}>
                  <input
                    value={newCheckItem}
                    onChange={e => setNewCheckItem(e.target.value)}
                    placeholder="Add checklist item..."
                  />
                </form>
              </>
            )}

            {activeTab === 'comments' && (
              <>
                {editedTask.comments.map(c => {
                  const u = users.find(x => x.id === c.userId);
                  return <p key={c.id}><strong>{u?.name}:</strong> {c.text}</p>;
                })}
                <form onSubmit={addComment}>
                  <input value={newComment} onChange={e => setNewComment(e.target.value)} />
                </form>
              </>
            )}
          </div>

          <div className="tm-side">
            {Object.values(Priority).map(p => (
              <div
                key={p}
                className="priority-btn"
                style={{
                  background: editedTask.priority === p ? priorityColors[p] : 'transparent',
                  color: editedTask.priority === p ? '#fff' : '#94a3b8'
                }}
                onClick={() => setEditedTask({ ...editedTask, priority: p })}
              >
                {p}
              </div>
            ))}

            <button onClick={handleSave} style={{ marginTop: 32 }}>
              Sync Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
