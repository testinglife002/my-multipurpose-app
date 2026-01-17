import React, { useState, useCallback, useMemo } from 'react';
import { Priority, Stage, Recurrence, INITIAL_TASKS } from './constants.js';
// import Board from './components/Board.jsx';
// import TaskModal from './components/TaskModal.jsx';
import './AppOne.css';
import Board from './components/Board.jsx';
import TaskModal from './components/TaskModal.jsx';

export default function AppOne() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering tasks based on title, description, or tags
  const filteredTasks = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q) ||
      task.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }, [tasks, searchQuery]);

  const handleCreateTask = useCallback((stage = Stage.TODO) => {
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      recurrence: Recurrence.NONE,
      completed: false,
      comments: [],
      tags: [],
      subTasks: [],
      stage: stage,
      priority: Priority.MEDIUM,
      assets: [],
      assignees: []
    };
    setEditingTask(newTask);
    setIsModalOpen(true);
  }, []);

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleSaveTask = useCallback((task) => {
    setTasks(prev => {
      const exists = prev.find(t => t.id === task.id);
      if (exists) {
        return prev.map(t => t.id === task.id ? task : t);
      }
      return [...prev, task];
    });
    setIsModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    if (window.confirm('Delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
      setIsModalOpen(false);
    }
  }, []);

  return (
    <div className="app-container" style={{marginTop:'36%'}} >
      <header className="header">
        <div className="logo-section">
          <div className="logo-icon"><i className="fas fa-layer-group"></i></div>
          <div className="logo-text">ZenTask</div>
        </div>

        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search tasks, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button className="btn-primary" onClick={() => handleCreateTask()}>
          <i className="fas fa-plus"></i> <span className="hide-mobile">Add Task</span>
        </button>
      </header>

      <main className="main-content">
        <Board 
          tasks={filteredTasks} 
          onEditTask={handleEditTask} 
          onCreateTaskInStage={handleCreateTask}
        />
      </main>

      {isModalOpen && editingTask && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}