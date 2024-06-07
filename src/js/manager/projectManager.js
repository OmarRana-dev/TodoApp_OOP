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
    console.log(this.projects);
    return this.projects.find((project) => project.id === projectID);
  }

  saveProjects() {
    LocalStorageService.saveData(this.projects);
  }

  displayProject() {
    console.log('Projects:');
    this.projects.forEach((project) => {
      console.log(`- ${project.projectName}`);
      project.todos.forEach((todo) => {
        console.log(
          `  - ${todo.title} [${todo.isCompleted ? 'Completed' : 'Pending'}]`,
        );
      });
    });
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
    // console.log(project);
  }
}

export { ProjectManager };
