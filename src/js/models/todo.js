import { IDGenerator } from '../services/idGenerator';

class Todo {
  constructor(
    projectID,
    title,
    description,
    dueDate,
    isImportant = false,
    isCompleted = false,
  ) {
    this.id = IDGenerator.generateTaskID(projectID);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isImportant = isImportant;
    this.isCompleted = isCompleted;
  }

  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
  }

  toggleImportant() {
    this.isImportant = !this.isImportant;
  }
}

export { Todo };
