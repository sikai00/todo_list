export default class Project {
  constructor(title, todo_list = []) {
    this.title = title;
    this.todo_list = todo_list;
  }

  getTitle() {
    return this.title;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  getTodoList() {
    return this.todo_list;
  }

  addTodo(todo) {
    this.todo_list.push(todo);
  }

  deleteTodo(todo) {
    this.todo_list = this.todo_list.filter(x => x !== todo);
  }

  contains(todo) {
    return this.todo_list.includes(todo);
  }
}