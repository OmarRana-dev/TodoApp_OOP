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

  editTaskStatus(Id) {
    const [projectId, taskId] = Id.split('_');
    const project = this.getProjectByID(projectId);

    console.log(project);
    console.log(project.todos);
    // console.log(projectId);
    // console.log(taskId);
    const task = project.todos.find((todo) => todo.id === Id);

    
    // return ;
    //   console.log(project);
    //   if (!project) {
    //     console.log('Project not found!');
    //     return;
    //   }

    //   try {
    //     const todo = new Todo(
    //       project.id,
    //       title,
    //       description,
    //       dueDate,
    //       isImportant,
    //       isCompleted,
    //     );
    //     project.todos.push(todo);
    //     this.saveProjects();
    //   } catch (error) {
    //     console.error(error.message);
    //   }
  }
}

export { ProjectManager };
