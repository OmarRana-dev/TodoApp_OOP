import { ProjectManager } from '../manager/projectManager';

const renderProject = () => {
  const projectManager = new ProjectManager();
  // console.log(projectManager);

  const projectList = document.querySelector('#projectListContainer');
  projectList.innerHTML = '';

  const selectProjectOptions = document.querySelector('#select-project');
  selectProjectOptions.innerHTML = '';

  const optionElement = document.createElement('option');
  optionElement.textContent = 'Select Project...';

  selectProjectOptions.appendChild(optionElement);

  let optionValue = 0;

  projectManager.projects.forEach((project) => {
    optionValue++;

    const optionElement = document.createElement('option');
    optionElement.textContent = project.projectName;
    optionElement.setAttribute('value', optionValue);
    optionElement.setAttribute('data', project.id);
    selectProjectOptions.appendChild(optionElement);

    const projectElement = document.createElement('div');
    projectElement.classList =
      'card bg-secondary-subtle mt-3 d-flex flex-row align-items-center shadow-sm';

    const titleElement = document.createElement('div');
    titleElement.classList = 'p-2 card-body project-container text-truncate';
    titleElement.textContent = project.projectName;

    const projectCloseBtn = document.createElement('button');
    projectCloseBtn.classList.add('btn-close');
    projectCloseBtn.setAttribute('type', 'button');

    projectElement.append(titleElement, projectCloseBtn);
    projectList.appendChild(projectElement);
  });
};

const renderTasks = () => {
  const taskList = document.getElementById('task-UI-container');
  taskList.innerHTML = '';

  const projectManager = new ProjectManager();

  projectManager.projects.forEach((project) => {
    project.todos.forEach((todo) => {
      const taskCardUpperBody = document.createElement('div');
      taskCardUpperBody.classList = 'card task-card';

      const cardBody = document.createElement('div');
      cardBody.classList = 'card-body';

      const cardTitleContainer = document.createElement('div');
      cardTitleContainer.classList =
        'topCard-row d-flex justify-content-between';

      const titleElement = document.createElement('h5');
      titleElement.classList = 'card-title';
      titleElement.textContent = todo.title;

      const closeBtnElement = document.createElement('button');
      closeBtnElement.classList.add('btn-close');
      closeBtnElement.setAttribute('type', 'button');

      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('card-text');
      descriptionElement.textContent = todo.description;

      const badgesContainer = document.createElement('div');
      badgesContainer.classList =
        'lowerCard-row d-flex justify-content-end flex-wrap gap-3';

      const dueDateElement = document.createElement('span');
      dueDateElement.classList = 'badge text-bg-info';
      dueDateElement.textContent = `Due: ${todo.dueDate}`;

      const isImportantElement = document.createElement('span');
      isImportantElement.classList =
        'badge text-bg-info edit-task-elements edit-isTaskImportant';
      isImportantElement.textContent = todo.isImportant;

      const isCompleteElement = document.createElement('span');
      isCompleteElement.classList =
        'badge text-bg-info edit-task-elements edit-isCompleted';
      isCompleteElement.textContent = todo.isCompleted;

      cardTitleContainer.append(titleElement, closeBtnElement);
      badgesContainer.append(
        dueDateElement,
        isImportantElement,
        isCompleteElement,
      );
      cardBody.append(cardTitleContainer, descriptionElement, badgesContainer);
      taskCardUpperBody.appendChild(cardBody);

      taskList.appendChild(taskCardUpperBody);
    });
  });
};

export { renderProject, renderTasks };
