import React from 'react';
import { Stage } from '../constants.js';
import Column from './Column.jsx';

export default function Board({ tasks, onEditTask, onCreateTaskInStage }) {
  const stages = Object.values(Stage);
  
  return (
    <div className="board-wrapper">
      {stages.map((stage) => {
        const stageTasks = tasks.filter((task) => task.stage === stage);
        return (
          <Column
            key={stage}
            stage={stage}
            tasks={stageTasks}
            onEditTask={onEditTask}
            onCreateTask={() => onCreateTaskInStage(stage)}
          />
        );
      })}
    </div>
  );
}