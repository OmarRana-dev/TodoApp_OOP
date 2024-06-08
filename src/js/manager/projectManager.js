import { LocalStorageService } from '../services/locolStorageService';
import { Todo } from '../models/todo';

class ProjectManager {
  constructor() {
    this.projects = LocalStorageService.loadData() || [];
  }

  addProject(project) {
    this.projects.push(project);
    this.saveProjects();
  }

  removePorjectByID(porjectID) {
    this.projects = this.projects.filter((project) => project.id !== porjectID);
    this.saveProjects();
  }

  getProjectByID(projectID) {
    return this.projects.find((project) => project.id === projectID);
  }

  saveProjects() {
    LocalStorageService.saveData(this.projects);
  }

  addTaskToProject(
    projectId,
    title,
    description,
    dueDate,
    isImportant,
    isCompleted,
  ) {
    const project = this.getProjectByID(projectId);
    console.log(project);
    if (!project) {
      console.log('Project not found!');
      return;
    }

    try {
      const todo = new Todo(
        project.id,
        title,
        description,
        dueDate,
        isImportant,
        isCompleted,
      );
      project.todos.push(todo);
      this.saveProjects();
    } catch (error) {
      console.error(error.message);
    }
  }

  toggleTaskCompletion(taskID) {
    const [projectID, unuse] = taskID.split('_');
    console.log(projectID);
    const project = this.getProjectByID(projectID);
    if (!project) {
      console.log('Project not found!');
      return;
    }

    const todo = project.getTodoByID(taskID);
    if (!todo) {
      console.log('Task not found!');
      return;
    }

    todo.toggleCompletion();
    this.saveProjects();
    console.log(
      `Task "${todo.title}" completion status toggled to ${todo.isCompleted ? 'Completed' : 'Pending'}.`,
    );
  }

  removeTaskbyID(id) {
    const projectID = id.split('_');
    const project = this.getProjectByID(projectID[0]);
    project.removeTodobyID(id);
    this.saveProjects();
  }
}

class Sorting extends ProjectManager {
  constructor() {
    super();
  }

  getTodayTasks = () => {
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    return this.projects.map((project) => ({
      ...project,
      todos: project.todos.filter((todo) => todo.dueDate === today),
    }));
  };

  getCompletedTasks = () => {
    return this.projects.map((project) => ({
      ...project,
      todos: project.todos.filter((todo) => todo.isCompleted),
    }));
  };

  getImportantTasks = () => {
    return this.projects.map((project) => ({
      ...project,
      todos: project.todos.filter((todo) => todo.isImportant),
    }));
  };
}

export { ProjectManager, Sorting };
