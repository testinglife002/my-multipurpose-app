import React from 'react';
import { getXFromDate } from '../../utils/dateUtils';
import './DependencyLines.css';
export function DependencyLines({
  tasks,
  timelineStart,
  pixelsPerDay,
  rowHeight,
  getTaskRowIndex
}) {
  return <svg className="dependency-lines">
      {tasks.map(task => task.dependencies.map(depId => {
      const depTask = tasks.find(t => t.id === depId);
      if (!depTask) return null;
      const startRow = getTaskRowIndex(depTask.id);
      const endRow = getTaskRowIndex(task.id);
      if (startRow === -1 || endRow === -1) return null;
      const startX = getXFromDate(depTask.dueDate, timelineStart, pixelsPerDay) + pixelsPerDay / 2;
      const startY = startRow * rowHeight + rowHeight / 2;
      const endX = getXFromDate(task.startDate, timelineStart, pixelsPerDay);
      const endY = endRow * rowHeight + rowHeight / 2;
      const midX = startX + (endX - startX) / 2;
      return <g key={`${task.id}-${depId}`}>
              <path d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`} className="dependency-path" markerEnd="url(#arrowhead)" />
            </g>;
    }))}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>;
}