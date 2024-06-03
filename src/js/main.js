// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import Alert from 'bootstrap/js/dist/alert';
// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';

// src/app.js
import { ProjectManager } from './manager/projectManager';
import { Project } from './models/project';
import { Todo } from './models/todo.js';
import { renderProject, renderTasks } from './services/rendreUI';

const addProject = () => {
  const projectform = document.querySelector('#project-form');

  const projectManager = new ProjectManager();
  projectform.addEventListener('submit', (e) => {
    // e.preventDefault();
    e.stopPropagation();
    const projectTitle = document
      .querySelector('#project-form-input')
      .value.trim();

    const project = new Project(projectTitle);
    projectManager.addProject(project);

    renderProject();
  });
};

const addTask = () => {
  const taskForm = document.querySelector('#task-form');

  const projectManager = new ProjectManager();
  taskForm.addEventListener('submit', (e) => {
    e.stopPropagation();
    // e.preventDefault();

    const value = document.querySelector('#select-project').value;
    const option = document.querySelector(`option[value='${value}']`);
    const projectId = option.attributes.data.value;

    const taskTitle = document.querySelector('#task-title').value.trim();
    const taskDescription = document
      .querySelector('#task-description')
      .value.trim();
    const taskDue = document.querySelector('#task-due-date').value;
    const taskImportance = document.querySelector('#task-importance').checked;

    // console.log(taskTitle);
    // console.log(taskDescription);
    // console.log(taskDue);
    // console.log(taskImportance);

    projectManager.addTaskToProject(
      projectId,
      taskTitle,
      taskDescription,
      taskDue,
      taskImportance,
    );
    renderTasks();
  });
};

document
  .getElementById('add-project-btn')
  .addEventListener('click', addProject);
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Initial render
renderProject();
renderTasks();
