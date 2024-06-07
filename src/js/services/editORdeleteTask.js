const editTaskStatus = (element) => {
  function toggleClass(element, className1, className2) {
    if (element.classList.contains(className1)) {
      element.classList.remove(className1);
      element.classList.add(className2);
    } else if (element.classList.contains(className2)) {
      element.classList.remove(className2);
      element.classList.add(className1);
    }
  }

  toggleClass(element, 'text-bg-success', 'text-bg-danger');
};

export { editTaskStatus };
