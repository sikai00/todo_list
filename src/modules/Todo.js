export default class Todo {
  constructor(title, description = '', dueDate = null, priority = false, completed = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  getTitle() {
    return this.title;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  getDueDate() {
    return this.dueDate;
  }

  setDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  getPriority() {
    return this.priority;
  }

  togglePriority() {
    this.priority = !this.priority;
  }

  getCompleted() {
    return this.completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}