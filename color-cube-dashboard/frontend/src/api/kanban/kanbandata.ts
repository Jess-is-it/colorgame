import { TodoCategory } from 'src/types/apps/kanban';
import { Chance } from 'chance';

import img1 from 'src/assets/images/blog/blog-image10.jpg';
import img2 from 'src/assets/images/blog/blog-image9.jpg';

import attach1 from 'src/assets/images/blog/blog-image10.jpg';

import olivia from 'src/assets/images/profile/olivia.png';
import emily from 'src/assets/images/profile/emily.png';

import ryan from 'src/assets/images/profile/ryan.png';

import Kiley from 'src/assets/images/profile/Kiley.png';
import jason from 'src/assets/images/profile/jason.png';
import Dalton from 'src/assets/images/profile/Dalton.png';
import Juan from 'src/assets/images/profile/Juan.png';
import Reva from 'src/assets/images/profile/Reva.png';

import { http, HttpResponse } from 'msw';

const chance = new Chance();

export const KanbanData: TodoCategory[] = [
  {
    id: '1',
    name: 'New Request',

    child: [
      {
        id: '101',
        taskTitle: 'Prepare project scope',
        taskImage: img1,
        taskText: chance.paragraph({ sentences: 1 }),
        dueDate: ' 10 May 2025',
        labels: ['Design', 'Sales'],
        priority: 'Normal Priority',
        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: olivia,
          },
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: jason,
          },
        ],
        attachments: [{ url: attach1 }],
        comments: [
          {
            author: chance.name(),
            avatar: jason,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
          {
            author: chance.name(),
            avatar: olivia,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
      {
        id: '102',
        taskTitle: 'Initial client meeting',
        taskImage: '',
        taskText: chance.paragraph({ sentences: 1 }),
        dueDate: '06 May 2025',
        labels: ['Development'],
        priority: 'Medium Priority',
        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: emily,
          },
          {
            name: chance.first(),
            avatar: ryan,
            id: chance.android_id(),
          },
          {
            name: chance.first(),
            avatar: olivia,
            id: chance.android_id(),
          },
        ],
        attachments: [],
        comments: [
          {
            author: chance.name(),
            avatar: ryan,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
      {
        id: '103',
        taskTitle: 'Collect project requirements',
        taskImage: '',
        taskText: chance.paragraph({ sentences: 1 }),
        dueDate: '8 july 2021',
        labels: ['Marketing'],
        priority: 'Normal Priority',
        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: ryan,
          },
        ],
        attachments: [],
        comments: [
          {
            author: chance.name(),
            avatar: olivia,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'In Progress',

    child: [
      {
        id: '201',
        taskTitle: 'Design homepage layout',
        taskImage: '',
        taskText: chance.paragraph({ sentences: 1 }),
        dueDate: '16 May 2025',
        labels: ['Research'],
        priority: 'High Priority',
        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: olivia,
          },
        ],
        attachments: [],
        comments: [
          {
            author: chance.name(),
            avatar: emily,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
      {
        id: '202',
        taskTitle: 'Set up development environment',
        taskImage: '',
        taskText: chance.paragraph({ sentences: 1 }),
        dueDate: '12 May 2025',
        labels: ['QA'],
        priority: 'Normal Priority',
        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: jason,
          },
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: emily,
          },
        ],
        attachments: [],
        comments: [
          {
            author: chance.name(),
            avatar: Kiley,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Complete',

    child: [
      {
        id: '301',
        taskTitle: 'Create wireframes',
        taskImage: '',
        taskText: chance.paragraph({ sentences: 1 }),
        dueDate: '03 May 2025',
        labels: ['Technology', 'Product'],
        priority: 'Normal Priority',
        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: Kiley,
          },
        ],
        attachments: [],
        comments: [
          {
            author: chance.name(),
            avatar: Dalton,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
      {
        id: '302',
        taskTitle: 'Approve branding guidelines',
        taskImage: img2,
        taskText: chance.paragraph({ sentences: 1 }),
        dueDate: '10 May 2025',
        labels: ['Sales', 'Design'],
        priority: 'Normal Priority',
        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: olivia,
          },
        ],
        attachments: [],
        comments: [
          {
            author: chance.name(),
            avatar: Juan,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
      {
        id: '303',
        taskTitle: 'Finalize user personas',
        taskImage: '',
        taskText: chance.paragraph({ sentences: 1 }),
        dueDate: '06 May 2025',
        labels: ['Technology', 'Support'],
        priority: 'High Priority',
        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: Dalton,
          },
        ],
        attachments: [],
        comments: [
          {
            author: chance.name(),
            avatar: Kiley,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
      {
        id: '304',
        taskTitle: 'Research competitor websites',
        taskImage: '',
        taskText: chance.paragraph({ sentences: 1 }),
        dueDate: '06 May 2025',
        labels: ['Marketing', 'Research'],
        priority: 'Medium Priority',

        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: emily,
          },
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: ryan,
          },
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: jason,
          },
        ],
        attachments: [],
        comments: [
          {
            author: chance.name(),
            avatar: jason,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'BackLog',

    child: [
      {
        id: '401',
        taskTitle: 'Plan marketing launch',
        dueDate: '06 May 2025',
        labels: ['Design', 'Development'],
        priority: 'Normal Priority',
        assignedTo: [
          {
            id: chance.android_id(),
            name: chance.first(),
            avatar: olivia,
          },
        ],
        attachments: [],
        comments: [
          {
            author: chance.name(),
            avatar: Reva,
            text: chance.paragraph({ sentences: 2 }),
            date: '09 April 2025',
          },
        ],
        subtasks: [
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: true },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
          { title: chance.sentence({ words: 4 }), isCompleted: false },
        ],
      },
    ],
  },
];

export default KanbanData;

// Extracting unique task properties from TodoData
const taskPropertiesSet = new Set<string>();

// Using forEach loops instead of flatMap
KanbanData.forEach((category) => {
  category.child.forEach((task) => {
    taskPropertiesSet.add(task.priority);
  });
});

// Convert Set to array
export const TaskProperties = Array.from(taskPropertiesSet);

const labelSet = new Set<string>();

KanbanData.forEach((category) => {
  category.child.forEach((task) => {
    (task.labels || []).forEach((label: string) => {
      labelSet.add(label);
    });
  });
});

export const AllLabels = Array.from(labelSet);

// We will store unique objects with 'name' and 'avatar' properties
const assignedToData: { name: string; avatar: string }[] = [];

KanbanData.forEach((categorys) => {
  categorys.child.forEach((task) => {
    (task.assignedTo || []).forEach((assignedTo: { name: string; avatar: string }) => {
      // Create a unique key for the name and avatar combination
      const user = { name: assignedTo.name, avatar: assignedTo.avatar };
      if (!assignedToData.some((u) => u.name === user.name && u.avatar === user.avatar)) {
        assignedToData.push(user);
      }
    });
  });
});

// Now, `assignedToData` will contain unique objects with name and avatar
export const AllassignedTo = assignedToData;

export const Kanbanhandlers = [
  // Mock API endpoint to fetch TodoData
  http.get('/api/kanban', () => {
    try {
      return HttpResponse.json({ status: 200, msg: 'success', data: KanbanData });
    } catch (error) {
      return HttpResponse.json({
        status: 400,
        msg: 'Internal server error',
        error,
      });
    }
  }),

  // Mock API endpoint to delete a task
  http.delete('/api/TodoData/deleteTask', async ({ request }) => {
    try {
      const { taskId } = (await request.json()) as { taskId: number };
      const updatedTodoData = KanbanData.filter((task) => task.id !== taskId);
      return HttpResponse.json({
        status: 200,
        msg: 'success',
        data: updatedTodoData,
      });
    } catch (error) {
      return HttpResponse.json({ status: 400, msg: 'failed', error });
    }
  }),

  // Mock API endpoint to add a new category
  http.post('/api/kanban/add-category', async ({ request }) => {
    try {
      const { categoryName } = (await request.json()) as { categoryName: string };
      const newCategory = {
        id: Math.random(),
        name: categoryName,
        child: [],
      };
      KanbanData.push(newCategory);
      return HttpResponse.json({
        status: 200,
        msg: 'success',
        data: newCategory,
      });
    } catch (error) {
      return HttpResponse.json({ status: 400, msg: 'failed', error });
    }
  }),

  // Mock API endpoint to delete a category
  http.delete('/api/kanban/delete-category', async ({ request }) => {
    try {
      const { id } = (await request.json()) as { id: number };
      const updatedTodoData = KanbanData.filter((category) => category.id !== id);
      return HttpResponse.json({
        status: 200,
        msg: 'success',
        data: updatedTodoData,
      });
    } catch (error) {
      return HttpResponse.json({
        status: 400,
        msg: 'Internal server error',
        error,
      });
    }
  }),
  // Mock API endpoint to edit a task
  http.patch('/api/kanban/edit-task', async ({ request }) => {
    try {
      const { taskId, newData } = (await request.json()) as { taskId: number; newData: string | number };
      KanbanData.forEach((category) => {
        category.child.forEach((task) => {
          if (task.id === taskId) {
            Object.assign(task, newData);
          }
        });
      });
      return HttpResponse.json({ status: 200, msg: 'success', data: KanbanData });
    } catch (error) {
      return HttpResponse.json({
        status: 400,
        msg: 'Internal server error',
        error,
      });
    }
  }),

  // Mock API endpoint to clear all tasks from a category
  http.delete('/api/TodoData/clearTasks', async ({ request }) => {
    try {
      const { categoryId } = (await request.json()) as { categoryId: number };
      const updatedTodoData = KanbanData.map((category) => {
        if (category.id === categoryId) {
          return { ...category, child: [] };
        }
        return category;
      });
      return HttpResponse.json({
        status: 200,
        msg: 'success',
        data: updatedTodoData,
      });
    } catch (error) {
      return HttpResponse.json({
        status: 400,
        msg: 'Internal server error',
        error,
      });
    }
  }),

  // Mock API endpoint to add a new task
  http.post('/api/TodoData/addTask', async ({ request }) => {
    try {
      const { categoryId, newTaskData } = (await request.json()) as {
        categoryId: number;
        newTaskData: string | number;
      };
      const updatedTodoData = KanbanData.map((category) => {
        if (category.id === categoryId) {
          return { ...category, child: [...category.child, newTaskData] };
        }
        return category;
      });
      return HttpResponse.json({
        status: 200,
        msg: 'success',
        data: updatedTodoData,
      });
    } catch (error) {
      return HttpResponse.json({
        status: 400,
        msg: 'Internal server error',
        error,
      });
    }
  }),

  // Mock API endpoint to update the name of a category
  http.post('/api/TodoData/updateCategory', async ({ request }) => {
    try {
      const { categoryId, categoryName } = (await request.json()) as {
        categoryId: number;
        categoryName: string;
      };
      const updatedTodoData = KanbanData.map((category) => {
        if (category.id === categoryId) {
          return { ...category, name: categoryName };
        }
        return category;
      });
      return HttpResponse.json({
        status: 200,
        msg: 'success',
        data: updatedTodoData,
      });
    } catch (error) {
      return HttpResponse.json({
        status: 400,
        msg: 'Internal server error',
        error,
      });
    }
  }),
];
