// ✅ KanbanBoard.jsx
import React, { useState } from "react";
import TaskCard from "./TaskCard";
import "./KanbanBoard.css";

const initialColumns = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "inprogress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

const KanbanBoard = ({ isDarkMode }) => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState(""); // Filter by title

  // Drag start
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
    setDraggedTaskId(taskId);
  };

  // Drop on column
  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;

    let newColumns = columns.map((col) => {
      // Remove task from current column
      return {
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      };
    });

    const draggedTask = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === taskId);

    newColumns = newColumns.map((col) => {
      if (col.id === targetColumnId) {
        return { ...col, tasks: [...col.tasks, draggedTask] };
      }
      return col;
    });

    setColumns(newColumns);
    setDraggedTaskId(null);
  };

  // Add new task
  const handleAddTask = (columnId) => {
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: taskInput,
      priority: "Low",
      assignees: [],
    };
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
    setTaskInput("");
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setColumns(
      columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      }))
    );
  };

  return (
    <div className={`kanban-board ${isDarkMode ? "dark" : ""}`}>
      {/* Filter */}
      <div className="kanban-filter">
        <input
          type="text"
          placeholder="Filter tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Columns */}
      <div className="kanban-columns">
        {columns.map((col) => (
          <div
            key={col.id}
            className="kanban-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <h3>{col.title}</h3>

            {/* Add Task */}
            <div className="add-task">
              <input
                type="text"
                placeholder="New task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleAddTask(col.id)
                }
              />
              <button onClick={() => handleAddTask(col.id)}>Add</button>
            </div>

            {/* Tasks */}
            <div className="task-list">
              {col.tasks
                .filter((task) =>
                  task.title.toLowerCase().includes(filter.toLowerCase())
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isDragging={draggedTaskId === task.id}
                    isDarkMode={isDarkMode}
                    onDragStart={handleDragStart}
                    onDrop={(e) => handleDrop(e, col.id)}
                    onClick={() => handleDeleteTask(task.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
