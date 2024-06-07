const editTaskStatus = (element) => {
  function toggleClass(element, className1, className2) {
    if (element.classList.contains(className1)) {
      element.classList.remove(className1);
      element.classList.add(className2);
      element.textContent = 'Status: Pending';
    } else if (element.classList.contains(className2)) {
      element.classList.remove(className2);
      element.classList.add(className1);
      element.textContent = 'Status: Done';
    }
  }

  toggleClass(element, 'text-bg-success', 'text-bg-danger');
};

const deleteTask_UI = (element) => {
  element.remove();
};

const deleteProject_UI = (element) => {
  element.remove();
};

export { editTaskStatus, deleteTask_UI, deleteProject_UI };
