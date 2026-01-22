import { Priority } from './types.js';

export const initialUsers = [
  { id: 'u1', name: 'Alex Rivera', avatar: 'https://picsum.photos/seed/u1/40/40', status: 'online', role: 'Lead Designer' },
  { id: 'u2', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/u2/40/40', status: 'online', role: 'Fullstack Dev' },
  { id: 'u3', name: 'Jordan Smith', avatar: 'https://picsum.photos/seed/u3/40/40', status: 'busy', role: 'Product Manager' },
  { id: 'u4', name: 'Synergy AI', avatar: 'https://picsum.photos/seed/ai/40/40', status: 'online', role: 'Virtual Assistant' },
];

export const initialNotifications = [
  { id: 'n1', userId: 'u1', title: 'Task Assigned', message: 'Sarah assigned you to "Design Landing Page"', timestamp: Date.now() - 500000, read: false },
  { id: 'n2', userId: 'u1', title: 'New Comment', message: 'Jordan commented on "API Integration"', timestamp: Date.now() - 1500000, read: true },
];

export const initialBoards = [
  {
    id: 'b1',
    title: 'Product Launch 2024',
    createdAt: Date.now() - 10000000,
    columns: [
      { id: 'col1', title: 'To Do', taskIds: ['t1', 't2'] },
      { id: 'col2', title: 'In Progress', taskIds: ['t3'] },
      { id: 'col3', title: 'Review', taskIds: [] },
      { id: 'col4', title: 'Done', taskIds: ['t4'] },
    ],
    tasks: {
      t1: {
        id: 't1',
        title: 'Design Landing Page',
        description: 'Create high-fidelity mockups for the new product landing page.',
        priority: Priority.HIGH,
        dueDate: '2024-06-20',
        assignees: ['u1', 'u2'],
        comments: [
          { id: 'c1', userId: 'u2', text: 'Working on the color palette now.', timestamp: Date.now() - 2000000 }
        ],
        activities: [
          { id: 'a1', userId: 'u1', action: 'created the task', timestamp: Date.now() - 4000000, type: 'create' },
          { id: 'a2', userId: 'u2', action: 'added a comment', timestamp: Date.now() - 2000000, type: 'comment' }
        ],
        attachments: [
          { id: 'att1', name: 'v1-mockup.fig', url: '#', type: 'figma', size: '2.4 MB' }
        ],
        columnId: 'col1',
        tags: ['design', 'ui'],
        checklist: []
      },
      t2: {
        id: 't2',
        title: 'API Integration',
        description: 'Connect frontend to the new GraphQL endpoints.',
        priority: Priority.MEDIUM,
        dueDate: '2024-06-25',
        assignees: ['u3'],
        comments: [],
        activities: [],
        attachments: [],
        columnId: 'col1',
        tags: ['backend'],
        checklist: []
      },
      t3: {
        id: 't3',
        title: 'User Testing',
        description: 'Conduct interview sessions with 5 beta testers.',
        priority: Priority.URGENT,
        dueDate: '2024-06-15',
        assignees: ['u2'],
        comments: [],
        activities: [],
        attachments: [],
        columnId: 'col2',
        tags: ['ux'],
        checklist: []
      },
      t4: {
        id: 't4',
        title: 'Initial Research',
        description: 'Market analysis of competitors.',
        priority: Priority.LOW,
        dueDate: '2024-05-30',
        assignees: ['u1'],
        comments: [],
        activities: [],
        attachments: [],
        columnId: 'col3',
        tags: ['research'],
        checklist: []
      },
    }
  },
  {
    id: 'b2',
    title: 'Marketing Strategy',
    createdAt: Date.now() - 5000000,
    columns: [
      { id: 'mcol1', title: 'Ideas', taskIds: [] },
      { id: 'mcol2', title: 'Active', taskIds: [] },
    ],
    tasks: {}
  }
];

export const mockMessages = [
  { id: 'm1', userId: 'u1', text: 'Hey team, just finished the landing page mockups!', timestamp: Date.now() - 3600000, reactions: { '🚀': ['u2', 'u3'] } },
  { id: 'm2', userId: 'u2', text: 'Awesome! Can you link them in the task card?', timestamp: Date.now() - 3000000 },
  { id: 'm3', userId: 'u4', text: 'I noticed the Design Landing Page task is due in 3 days. Need a breakdown of subtasks?', timestamp: Date.now() - 2000000, isSystem: true },
];
