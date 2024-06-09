import { IDGenerator } from '../services/idGenerator';

class Project {
  constructor(projectName) {
    this.id = IDGenerator.generateProjectID();
    this.projectName = projectName;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodobyID(todoID) {
    this.todos = this.todos.filter((todo) => todo.id !== todoID);
  }

  getTodoByID(todoID) {
    return this.todos.find((todo) => todo.id === todoID);
  }
}

export { Project };
