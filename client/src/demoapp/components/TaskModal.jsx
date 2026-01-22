// 🔹 4️⃣ TaskModal.jsx (modal kept identical)
import "./task-modal.css";
import React, { useState } from "react";

const TaskModal = ({ task, onClose, onSave, isDarkMode }) => {
  const [editedTask, setEditedTask] = useState(task);

  return (
    <div className="modal-overlay">
      <div className={`modal ${isDarkMode ? "dark" : ""}`}>
        <header className="modal-header">
          <input
            value={editedTask.title}
            onChange={e => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <button onClick={onClose}>✕</button>
        </header>

        <button className="save-btn" onClick={() => onSave(editedTask)}>
          Sync Changes
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
