export const Priority = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent'
};

export const Stage = {
  BACKLOG: 'Backlog',
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  REVIEW: 'Review',
  DONE: 'Done'
};

export const Recurrence = {
  NONE: 'None',
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly'
};

export const TEAM_MEMBERS = [
  { id: '1', name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=alex' },
  { id: '2', name: 'Jordan Smith', avatar: 'https://i.pravatar.cc/150?u=jordan' },
  { id: '3', name: 'Sam Chen', avatar: 'https://i.pravatar.cc/150?u=sam' },
  { id: '4', name: 'Taylor Reed', avatar: 'https://i.pravatar.cc/150?u=taylor' },
];

export const INITIAL_TASKS = [
  {
    id: 't1',
    title: 'Finalize Brand Guidelines',
    description: 'Establish typography and color system for the new website.',
    startDate: '2024-03-01',
    dueDate: '2024-03-15',
    recurrence: 'None',
    completed: false,
    comments: [{ id: 'c1', user: 'Alex', text: 'Started the color palette audit.', createdAt: new Date().toISOString() }],
    tags: ['Branding', 'Design'],
    subTasks: [
      { id: 'st1', text: 'Contrast ratio check', completed: true },
      { id: 'st2', text: 'Select primary font', completed: false }
    ],
    stage: 'In Progress',
    priority: 'High',
    assets: [{ id: 'a1', name: 'logo_draft.png' }],
    assignees: ['1', '2']
  },
  {
    id: 't2',
    title: 'Quarterly Review',
    description: 'Internal sync with stakeholders to discuss Q1 progress.',
    startDate: '2024-03-20',
    dueDate: '2024-03-22',
    recurrence: 'Monthly',
    completed: false,
    comments: [],
    tags: ['Meeting'],
    subTasks: [],
    stage: 'To Do',
    priority: 'Urgent',
    assets: [],
    assignees: ['3', '4']
  }
];