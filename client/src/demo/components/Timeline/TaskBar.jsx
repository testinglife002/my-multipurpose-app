import React from 'react';
import { getXFromDate, getDurationInDays } from '../../utils/dateUtils';
import { Avatar } from '../ui/Avatar';
import { USERS } from '../../data/mockData';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import './TaskBar.css';
export function TaskBar({
  task,
  timelineStart,
  pixelsPerDay,
  onClick
}) {
  const left = getXFromDate(task.startDate, timelineStart, pixelsPerDay);
  const duration = getDurationInDays(task.startDate, task.dueDate);
  const width = Math.max(duration * pixelsPerDay, 40);
  const assignees = USERS.filter(u => task.assignees.includes(u.id));
  return <div className={`task-bar priority-${task.priority}`} style={{
    left,
    width
  }} onClick={() => onClick(task)}>
      <div className="progress-overlay" style={{
      width: `${task.completion}%`
    }} />

      <div className="task-content">
        <div className="task-info">
          {task.status === 'done' ? <CheckCircle2 className="task-icon" /> : task.priority === 'urgent' ? <AlertCircle className="task-icon" /> : <Clock className="task-icon" />}
          <span className="task-title">
            {task.title}
          </span>
        </div>

        {width > 100 && <div className="task-assignees">
            {assignees.map(user => <Avatar key={user.id} src={user.avatar} alt={user.name} size="sm" className="task-avatar" />)}
          </div>}
      </div>

      <div className="drag-handle left" />
      <div className="drag-handle right" />
    </div>;
}