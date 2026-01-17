import { addDays, format } from 'date-fns';
const today = new Date();
const fmt = d => format(d, 'yyyy-MM-dd');
export const USERS = [{
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
export const STAGES = ['Backlog', 'Design', 'Development', 'Testing', 'Deployment'];
export const INITIAL_TASKS = [{
  id: 't1',
  title: 'Project Kickoff',
  description: 'Initial meeting with stakeholders to define scope and requirements.',
  startDate: fmt(addDays(today, -2)),
  dueDate: fmt(addDays(today, 0)),
  stage: 'Backlog',
  priority: 'high',
  status: 'done',
  completion: 100,
  assignees: ['u1', 'u2'],
  dependencies: [],
  tags: ['meeting', 'planning'],
  comments: [],
  subTasks: [],
  recurrence: 'none'
}, {
  id: 't2',
  title: 'UI/UX Design Phase',
  description: 'Create high-fidelity mockups for the main dashboard.',
  startDate: fmt(addDays(today, 1)),
  dueDate: fmt(addDays(today, 5)),
  stage: 'Design',
  priority: 'urgent',
  status: 'in-progress',
  completion: 45,
  assignees: ['u2'],
  dependencies: ['t1'],
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
  dependencies: ['t2'],
  tags: ['dev', 'react'],
  comments: [],
  subTasks: [],
  recurrence: 'none'
}, {
  id: 't4',
  title: 'Backend API Setup',
  description: 'Initialize Node.js server and database connection.',
  startDate: fmt(addDays(today, 3)),
  dueDate: fmt(addDays(today, 8)),
  stage: 'Development',
  priority: 'medium',
  status: 'todo',
  completion: 10,
  assignees: ['u3'],
  dependencies: ['t1'],
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
  tags: ['ops'],
  comments: [],
  subTasks: [],
  recurrence: 'none'
}];