// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import Alert from 'bootstrap/js/dist/alert';
// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';

// src/app.js
import { ProjectManager, Sorting } from './manager/projectManager';
import { Project } from './models/project';
import { renderProject, renderTasks } from './services/rendreUI';
import {
  editTaskStatus,
  deleteTask_UI,
  deleteProject_UI,
} from './services/edit_UI.js';

// Initial render
renderProject();
renderTasks();

const addProject = () => {
  const projectform = document.querySelector('form#project-form');

  projectform.addEventListener('submit', (e) => {
    e.stopPropagation();

    const projectTitle = document
      .querySelector('#project-form-input')
      .value.trim();

    try {
      const projectManager = new ProjectManager();
      const project = new Project(projectTitle);
      projectManager.addProject(project);
    } catch (error) {
      alert(error.message); // Display error to the user
      console.error(error.message); // Log error to the console
    }
  });
};

const addTask = () => {
  const taskForm = document.querySelector('form#task-form');

  // console.log(taskForm);
  const projectManager = new ProjectManager();
  taskForm.addEventListener('submit', (e) => {
    e.stopPropagation();

    const projectSelect = document.querySelector('#select-project');
    const value = projectSelect.value;
    const option = document.querySelector(`option[value='${value}']`);
    const projectId = option.getAttribute('data-id');

    const taskTitle = document.querySelector('#taskInputTitle').value.trim();
    const taskDescription = document
      .querySelector('#taskInputdescription')
      .value.trim();
    const taskDue = document.querySelector('#taskInputDueDate').value;
    const taskImportance = document.querySelector(
      '#taskCheckBoxImportance',
    ).checked;

    try {
      const projectManager = new ProjectManager();
      projectManager.addTaskToProject(
        projectId,
        taskTitle,
        taskDescription,
        taskDue,
        taskImportance,
      );
    } catch (error) {
      alert(error.message); // Display error to the user
      console.error(error.message); // Log error to the console
    }
  });
};

const attachEventListeners = () => {
  document.querySelectorAll('.edit-isCompleted').forEach((element) => {
    element.addEventListener('click', () => {
      const project = new ProjectManager();
      project.toggleTaskCompletion(element.getAttribute('id'));
      editTaskStatus(element);
    });
  });

  document.querySelectorAll('.deleteTaskBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const task = btn.parentElement.parentElement.parentElement;
      const taskID = task.getAttribute('id');

      const project = new ProjectManager();

      project.removeTaskbyID(taskID);
      deleteTask_UI(task);
    });
  });

  document.querySelectorAll('.deleteProjectBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const element = btn.parentElement;
      const projectID = element.getAttribute('id');

      const project = new ProjectManager();

      project.removePorjectByID(projectID);
      deleteProject_UI(element);
      renderTasks();
    });
  });
};

document.querySelector('#addProject-btn').addEventListener('click', addProject);
document.querySelector('#addTask-btn').addEventListener('click', addTask);
attachEventListeners();

document.querySelector('#todaysTasks').addEventListener('click', () => {
  const projects = new Sorting();
  const todayTasks = projects.getTodayTasks();
  renderTasks(todayTasks);
  attachEventListeners();
});

document.querySelector('#completedTasks').addEventListener('click', () => {
  const projects = new Sorting();
  const completedTasks = projects.getCompletedTasks();
  renderTasks(completedTasks);
  attachEventListeners();
});

document.querySelector('#importantTasks').addEventListener('click', () => {
  const projects = new Sorting();
  const importantTasks = projects.getImportantTasks();
  renderTasks(importantTasks);
  attachEventListeners();
});

document.querySelector('#allTasks').addEventListener('click', () => {
  renderTasks();
  attachEventListeners();
});

document.querySelectorAll('.projectsElement').forEach((element) => {
  element.addEventListener('click', (e) => {
    const id = element.getAttribute('id');

    const projects = new ProjectManager();
    const project = projects.getProjectByID(id);
    const arr = [project];
    renderTasks(arr);
    attachEventListeners();
  });
});
