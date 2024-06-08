import { Project } from '../models/project';
import { Todo } from '../models/todo';

const LOCAL_STORAGE_KEY = 'todoAppData';

class LocalStorageService {
  static saveData(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  static loadData() {
    const data =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultProjects;
    return data.map((projectData) => {
      const project = new Project(projectData.projectName);
      project.id = projectData.id;
      project.todos = projectData.todos.map((todo) => {
        const todoInstance = new Todo(
          project.id,
          todo.title,
          todo.description,
          todo.dueDate,
          todo.isImportant,
          todo.isCompleted,
        );
        todoInstance.id = todo.id;
        return todoInstance;
      });
      return project;
    });
  }
}

const defaultProjects = [
  {
    id: 'P0',
    projectName: 'Programming Fundamentals',
    todos: [
      {
        id: 'P0_T1',
        title: 'Learn a new JavaScript framework (e.g., React, Vue)',
        description:
          'Brief description of the task related to learning a new JavaScript framework',
        dueDate: '2024-06-13',
        isCompleted: true,
        isImportant: true,
      },
      {
        id: 'P0_T2',
        title: 'Practice solving coding challenges online',
        description:
          'Brief description of the task related to practicing coding challenges',
        dueDate: '2024-03-7',
        isCompleted: false,
        isImportant: true,
      },
    ],
  },
  {
    id: 'P1',
    projectName: 'Web Development Skills',
    todos: [
      {
        id: 'P1_T1',
        title: 'Contribute to an open-source project',
        description:
          'Brief description of the task related to contributing to an open-source project',
        dueDate: '2024-03-05',
        isCompleted: true,
        isImportant: true,
      },
      {
        id: 'P1_T2',
        title: 'Debug a complex bug in your code',
        description:
          'Brief description of the task related to debugging a complex bug',
        dueDate: '2024-03-04',
        isCompleted: false,
        isImportant: false,
      },
    ],
  },
  {
    id: 'P2',
    projectName: 'Mindfulness and Meditation',
    todos: [
      {
        id: 'P2_T1',
        title: 'Meditate for 10 minutes',
        description: 'Brief description of the task related to meditating',
        dueDate: '2024-03-05',
        isCompleted: true,
        isImportant: true,
      },
      {
        id: 'P2_T2',
        title: 'Read a book about mindfulness',
        description:
          'Brief description of the task related to reading about mindfulness',
        dueDate: '2024-04-12',
        isCompleted: false,
        isImportant: false,
      },
    ],
  },
];

export { LocalStorageService };
