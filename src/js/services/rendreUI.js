import { ProjectManager } from '../manager/projectManager';
import { DateValidator } from '../utils/dateValidator';

const renderProject = () => {
  const projectManager = new ProjectManager();

  const projectList = document.querySelector('#projectListContainer');
  projectList.innerHTML = '';

  const selectProjectOptions = document.querySelector('#select-project');
  selectProjectOptions.innerHTML =
    '<option selected required>Select Project...</option>';

  let optionValue = 0;

  projectManager.projects.forEach((project) => {
    optionValue++;

    const optionElement = document.createElement('option');
    optionElement.textContent = project.projectName;
    optionElement.setAttribute('value', optionValue);
    optionElement.setAttribute('data-id', project.id);
    selectProjectOptions.appendChild(optionElement);

    const projectElement = document.createElement('div');
    projectElement.classList =
      'card mt-3 d-flex flex-row align-items-center projectsElement';
    projectElement.setAttribute('id', project.id);

    const titleElement = document.createElement('div');
    titleElement.classList = 'p-2 card-body project-container text-truncate';
    titleElement.textContent = project.projectName;

    const projectCloseBtn = document.createElement('button');
    projectCloseBtn.classList = 'btn-close deleteProjectBtn';
    projectCloseBtn.setAttribute('type', 'button');

    projectElement.append(titleElement, projectCloseBtn);
    projectList.appendChild(projectElement);
  });
};

const renderTasks = (customStorage = null) => {
  const taskList = document.getElementById('task-UI-container');
  taskList.innerHTML = '';

  const projectManager = new ProjectManager();

  const projectsToRender = customStorage || projectManager.projects;

  const getImportantTasks = () => {
    let importantTasks = [];
    projectsToRender.forEach((project) => {
      importantTasks = importantTasks.concat(project.todos);
    });
    const pendingUrgentTasks = importantTasks.filter(
      (todo) => !todo.isCompleted && todo.isImportant,
    );
    const pendingNormalTasks = importantTasks.filter(
      (todo) => !todo.isCompleted && !todo.isImportant,
    );
    const completedTasks = importantTasks.filter(
      (todo) => todo.isCompleted && todo.isImportant,
    );
    return [...pendingUrgentTasks, ...pendingNormalTasks, ...completedTasks];
  };

  getImportantTasks().forEach((todo) => {
    const taskCardUpperBody = document.createElement('div');
    taskCardUpperBody.classList = 'card task-card';
    taskCardUpperBody.setAttribute('id', todo.id);

    const cardBody = document.createElement('div');
    cardBody.classList = 'card-body d-flex flex-column justify-content-between';

    const cardTitleContainer = document.createElement('div');
    cardTitleContainer.classList = 'topCard-row d-flex justify-content-between';

    const titleElement = document.createElement('h5');
    titleElement.classList = 'card-title';
    titleElement.textContent = todo.title;

    const closeBtnElement = document.createElement('button');
    closeBtnElement.classList = 'btn-close deleteTaskBtn';
    closeBtnElement.setAttribute('type', 'button');

    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('card-text');
    descriptionElement.textContent = todo.description;

    const badgesContainer = document.createElement('div');
    badgesContainer.classList =
      'lowerCard-row d-flex justify-content-end flex-wrap gap-3';

    const dueDateElement = document.createElement('span');
    dueDateElement.classList = 'badge text-bg-info';
    dueDateElement.textContent = `Due Date: ${DateValidator.validateDate(todo.dueDate)}`;

    const isImportantElement = document.createElement('span');
    if (todo.isImportant) {
      isImportantElement.classList = 'badge text-bg-warning';
      isImportantElement.textContent = 'Priority: Urgent';
    } else {
      isImportantElement.classList = 'badge text-bg-secondary';
      isImportantElement.textContent = 'Priority: Normal';
    }

    const isCompleteElement = document.createElement('span');
    isCompleteElement.setAttribute('id', todo.id);
    if (todo.isCompleted) {
      isCompleteElement.classList = 'badge text-bg-success edit-isCompleted';
      isCompleteElement.textContent = 'Status: Done';
    } else {
      isCompleteElement.classList = 'badge text-bg-danger edit-isCompleted';
      isCompleteElement.textContent = 'Status: Pending';
    }

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
};

export { renderProject, renderTasks };
