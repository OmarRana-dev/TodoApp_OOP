import { Project } from '../models/project';
import { Todo } from '../models/todo';

const LOCAL_STORAGE_KEY = 'todoAppData';

class LocalStorageService {
  static saveData(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  static loadData() {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
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

  // static loadData() {
  //   const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   return JSON.parse(data);
  // }
}

export { LocalStorageService };
