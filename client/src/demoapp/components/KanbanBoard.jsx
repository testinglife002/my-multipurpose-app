// ✅ KanbanBoard.jsx
import React, { useState, useMemo } from 'react';
import { Priority } from '../types.js';
import { initialBoards, initialUsers } from '../constants.js';
import TaskCard from './TaskCard.jsx';
import TaskModal from './TaskModal.jsx';

const KanbanBoard = ({ isDarkMode = false }) => {
  const [board, setBoard] = useState(initialBoards[0]);
  const users = initialUsers;

  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterAssignee, setFilterAssignee] = useState('ALL');
  const [showActivityFeed, setShowActivityFeed] = useState(false);

  const styles = {
    app: {
      display: 'flex',
      width: '100%',
      height: '100%',
      background: isDarkMode ? '#020617' : '#f8fafc',
      overflow: 'hidden'
    },
    header: {
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${isDarkMode ? '#1e293b' : '#e2e8f0'}`
    },
    boardArea: {
      flex: 1,
      padding: 24,
      overflowX: 'auto',
      display: 'flex',
      gap: 24
    },
    column: {
      width: 320,
      background: isDarkMode ? '#0f172a' : '#ffffff',
      borderRadius: 16,
      border: `1px solid ${isDarkMode ? '#1e293b' : '#e5e7eb'}`,
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100%'
    },
    columnHeader: {
      padding: 16,
      fontWeight: 800,
      fontSize: 14
    },
    columnBody: {
      padding: 12,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    },
    addTaskBtn: {
      padding: 12,
      borderRadius: 12,
      border: '2px dashed #c7d2fe',
      background: 'transparent',
      cursor: 'pointer',
      fontWeight: 700
    }
  };

  const filteredTasks = useMemo(() => {
    const search = searchQuery.toLowerCase();
    return Object.fromEntries(
      Object.entries(board.tasks).filter(([_, t]) => {
        if (filterPriority !== 'ALL' && t.priority !== filterPriority) return false;
        if (filterAssignee !== 'ALL' && !t.assignees.includes(filterAssignee)) return false;
        if (search && !t.title.toLowerCase().includes(search)) return false;
        return true;
      })
    );
  }, [board.tasks, searchQuery, filterPriority, filterAssignee]);

  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.setData('taskId', id);
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (!taskId) return;

    const task = board.tasks[taskId];
    if (task.columnId === columnId) return;

    const updatedTask = { ...task, columnId };
    const newColumns = board.columns.map(col => ({
      ...col,
      taskIds:
        col.id === task.columnId
          ? col.taskIds.filter(id => id !== taskId)
          : col.id === columnId
          ? [...col.taskIds, taskId]
          : col.taskIds
    }));

    setBoard({
      ...board,
      columns: newColumns,
      tasks: { ...board.tasks, [taskId]: updatedTask }
    });

    setDraggedTaskId(null);
  };

  const handleAddTask = (columnId) => {
    const id = 't' + Date.now();
    const newTask = {
      id,
      title: 'New Task',
      description: '',
      priority: Priority.MEDIUM,
      dueDate: new Date().toISOString().split('T')[0],
      assignees: [],
      comments: [],
      activities: [],
      attachments: [],
      checklist: [],
      columnId,
      tags: []
    };

    setBoard({
      ...board,
      tasks: { ...board.tasks, [id]: newTask },
      columns: board.columns.map(c =>
        c.id === columnId ? { ...c, taskIds: [...c.taskIds, id] } : c
      )
    });

    setSelectedTask(newTask);
  };

  return (
    <div style={styles.app}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={styles.header}>
          <input
            placeholder="Find tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 10,
              border: '1px solid #cbd5f5',
              width: 260
            }}
          />
          <button onClick={() => setShowActivityFeed(!showActivityFeed)}>📊</button>
        </div>

        <div style={styles.boardArea}>
          {board.columns.map(col => (
            <div
              key={col.id}
              style={styles.column}
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDrop(e, col.id)}
            >
              <div style={styles.columnHeader}>{col.title}</div>

              <div style={styles.columnBody}>
                {col.taskIds.map(id => {
                  const task = filteredTasks[id];
                  if (!task) return null;
                  return (
                    <TaskCard
                      key={id}
                      task={task}
                      users={users}
                      onDragStart={handleDragStart}
                      onClick={() => setSelectedTask(task)}
                      onDelete={() => {}}
                      isDragging={draggedTaskId === id}
                      isDarkMode={isDarkMode}
                    />
                  );
                })}

                <button
                  style={styles.addTaskBtn}
                  onClick={() => handleAddTask(col.id)}
                >
                  + New Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          users={users}
          isDarkMode={isDarkMode}
          onClose={() => setSelectedTask(null)}
          onSave={(t) =>
            setBoard({
              ...board,
              tasks: { ...board.tasks, [t.id]: t }
            })
          }
        />
      )}
    </div>
  );
};

export default KanbanBoard;
