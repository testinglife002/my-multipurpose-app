/**
 * MOCK DATA
 *
 * Sample data for development and demonstration.
 * In production, this would be replaced with API calls to a backend service.
 *
 * DATA STRUCTURE:
 * - USERS: Team members available for task assignment
 * - STAGES: Project workflow stages (swim lanes in timeline)
 * - INITIAL_TASKS: Sample tasks demonstrating all features
 *
 * TASK RELATIONSHIPS:
 * The sample tasks demonstrate a realistic project workflow:
 * 1. Project Kickoff (completed)
 * 2. UI/UX Design (in progress, depends on kickoff)
 * 3. Frontend Architecture (pending, depends on design)
 * 4. Backend API Setup (pending, depends on kickoff)
 * 5. QA Testing (pending, depends on frontend + backend)
 * 6. Production Deployment (pending, depends on testing)
 */

import { Task, User, Stage } from '../types/task';
import { addDays, format } from 'date-fns';

// Helper to format dates as ISO strings (YYYY-MM-DD)
const today = new Date();
const fmt = (d: Date) => format(d, 'yyyy-MM-dd');

/**
 * TEAM MEMBERS
 * Sample users with avatars from pravatar.cc (random avatar service)
 * Status indicates availability (online/busy/offline)
 */
export const USERS: User[] = [{
  id: 'u1',
  name: 'Alex Chen',
  avatar: 'https://i.pravatar.cc/150?u=1',
  status: 'online'
}, {
  id: 'u2',
  name: 'Sarah Jones',
  avatar: 'https://i.pravatar.cc/150?u=2',
  status: 'busy'
}, {
  id: 'u3',
  name: 'Mike Ross',
  avatar: 'https://i.pravatar.cc/150?u=3',
  status: 'offline'
}, {
  id: 'u4',
  name: 'Emily Blunt',
  avatar: 'https://i.pravatar.cc/150?u=4',
  status: 'online'
}];

/**
 * PROJECT STAGES
 * Defines the workflow stages (swim lanes in timeline view)
 * Order matters - stages are rendered top to bottom in this order
 */
export const STAGES: Stage[] = ['Backlog', 'Design', 'Development', 'Testing', 'Deployment'];

/**
 * SAMPLE TASKS
 * Demonstrates all task features:
 * - Multiple priorities (low, medium, high, urgent)
 * - Various statuses (todo, in-progress, review, done)
 * - Task dependencies (Gantt-style relationships)
 * - Multi-user assignment
 * - Subtasks and completion tracking
 * - Tags for categorization
 * - Date ranges spanning multiple days
 */
export const INITIAL_TASKS: Task[] = [{
  id: 't1',
  title: 'Project Kickoff',
  description: 'Initial meeting with stakeholders to define scope and requirements.',
  startDate: fmt(addDays(today, -2)),
  // Started 2 days ago
  dueDate: fmt(addDays(today, 0)),
  // Due today
  stage: 'Backlog',
  priority: 'high',
  status: 'done',
  // Completed task
  completion: 100,
  assignees: ['u1', 'u2'],
  // Multi-user assignment
  dependencies: [],
  // No dependencies (first task)
  tags: ['meeting', 'planning'],
  comments: [],
  subTasks: [],
  recurrence: 'none'
}, {
  id: 't2',
  title: 'UI/UX Design Phase',
  description: 'Create high-fidelity mockups for the main dashboard.',
  startDate: fmt(addDays(today, 1)),
  // Starts tomorrow
  dueDate: fmt(addDays(today, 5)),
  // 4-day duration
  stage: 'Design',
  priority: 'urgent',
  // Highest priority
  status: 'in-progress',
  completion: 45,
  // Partially complete
  assignees: ['u2'],
  dependencies: ['t1'],
  // Depends on kickoff
  tags: ['design', 'figma'],
  comments: [],
  subTasks: [{
    id: 'st1',
    title: 'Wireframes',
    completed: true
  }, {
    id: 'st2',
    title: 'Color Palette',
    completed: true
  }, {
    id: 'st3',
    title: 'High-fi Mockups',
    completed: false
  }],
  recurrence: 'none'
}, {
  id: 't3',
  title: 'Frontend Architecture',
  description: 'Setup React project, Tailwind, and basic routing.',
  startDate: fmt(addDays(today, 3)),
  dueDate: fmt(addDays(today, 7)),
  stage: 'Development',
  priority: 'high',
  status: 'todo',
  completion: 0,
  assignees: ['u1', 'u3'],
  // Two developers assigned
  dependencies: ['t2'],
  // Depends on design completion
  tags: ['dev', 'react'],
  comments: [],
  subTasks: [],
  recurrence: 'none'
}, {
  id: 't4',
  title: 'Backend API Setup',
  description: 'Initialize Node.js server and database connection.',
  startDate: fmt(addDays(today, 3)),
  // Parallel with frontend
  dueDate: fmt(addDays(today, 8)),
  stage: 'Development',
  priority: 'medium',
  status: 'todo',
  completion: 10,
  // Minimal progress
  assignees: ['u3'],
  dependencies: ['t1'],
  // Only depends on kickoff (can start before design)
  tags: ['backend', 'api'],
  comments: [],
  subTasks: [],
  recurrence: 'none'
}, {
  id: 't5',
  title: 'QA Testing',
  description: 'Run integration tests and check for bugs.',
  startDate: fmt(addDays(today, 9)),
  dueDate: fmt(addDays(today, 12)),
  stage: 'Testing',
  priority: 'medium',
  status: 'todo',
  completion: 0,
  assignees: ['u4'],
  dependencies: ['t3', 't4'],
  // Depends on BOTH frontend and backend
  tags: ['qa'],
  comments: [],
  subTasks: [],
  recurrence: 'none'
}, {
  id: 't6',
  title: 'Production Deployment',
  description: 'Deploy to Vercel and run smoke tests.',
  startDate: fmt(addDays(today, 13)),
  dueDate: fmt(addDays(today, 14)),
  stage: 'Deployment',
  priority: 'high',
  status: 'todo',
  completion: 0,
  assignees: ['u1'],
  dependencies: ['t5'],
  // Final task, depends on testing
  tags: ['ops'],
  comments: [],
  subTasks: [],
  recurrence: 'none'
}];