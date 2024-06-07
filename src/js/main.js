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
import { editTaskStatus } from './services/editORdeleteTask';

const addProject = () => {
  const projectform = document.querySelector('form#project-form');

  const projectManager = new ProjectManager();
  projectform.addEventListener('submit', (e) => {
    e.stopPropagation();

    try {
      const projectTitle = document
        .querySelector('#project-form-input')
        .value.trim();

      console.log(projectTitle);
      const project = new Project(projectTitle);
      projectManager.addProject(project);

      renderProject();
    } catch (error) {
      console.error(error.message);
    }
  });
};

const addTask = () => {
  const taskForm = document.querySelector('form#task-form');

  // console.log(taskForm);
  const projectManager = new ProjectManager();
  taskForm.addEventListener('submit', (e) => {
    e.stopPropagation();
    // e.preventDefault();

    try {
      const value = document.querySelector('#select-project').value;
      const option = document.querySelector(`option[value='${value}']`);
      const projectId = option.attributes.data.value;

      const taskTitle = document.querySelector('#taskInputTitle').value.trim();
      const taskDescription = document
        .querySelector('#taskInputdescription')
        .value.trim();
      const taskDue = document.querySelector('#taskInputDueDate').value;
      const taskImportance = document.querySelector(
        '#taskCheckBoxImportance',
      ).checked;

      projectManager.addTaskToProject(
        projectId,
        taskTitle,
        taskDescription,
        taskDue,
        taskImportance,
      );
      console.log(taskTitle);
      renderTasks();
    } catch (error) {
      console.error(error.message);
    }
  });
};

document.querySelector('#addProject-btn').addEventListener('click', addProject);
document.querySelector('#addTask-btn').addEventListener('click', addTask);

// Initial render
console.log('helo');
renderProject();
renderTasks();

const elements = document.querySelectorAll('.edit-isCompleted');
// console.log(elements);
elements.forEach((element) => {
  element.addEventListener('click', () => {
    // console.log(element.getAttribute('id'));
    const project = new ProjectManager();
    // console.log(project);
    project.editTaskStatus(element.getAttribute('id'));
    // editTaskStatus(element);
  });
});
