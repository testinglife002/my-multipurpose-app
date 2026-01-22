export const Priority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

/**
 * JS Structures (Implicit):
 * 
 * User: { id, name, avatar, status, role }
 * Task: { id, title, description, priority, dueDate, assignees, comments, activities, attachments, checklist, columnId, tags }
 * Column: { id, title, taskIds }
 * Board: { id, title, columns, tasks, createdAt }
 */
