import Todo from "../Todo";
import DeleteIcon from "../../icons/delete.png"

/**
 * Creates the HTML Node for the input project.
 * @param {Project} project 
 * @returns HTML Node of the Project.
 */
export default function drawProjectNode(project) {
  const projectNode = document.createElement('div');
  projectNode.classList.add('project');

  const projectTitle = document.createElement('div');
  projectTitle.classList.add('project-title');
  projectTitle.textContent = project.getTitle();

  projectNode.appendChild(projectTitle);
  project.getTodoList().forEach(todo => {
    projectNode.appendChild(drawTodoNode(todo, project));
  });

  projectNode.appendChild(drawAddTaskNode(project, projectNode));

  return projectNode;
}

/**
 * Creates the HTML Node for the input Todo.
 * @param {Todo} todo 
 * @param {Project} project required for the Project to remove this Todo.
 * @returns HTML Node of the Todo.
 */
function drawTodoNode(todo, project) {
  const todoNode = document.createElement('div');
  todoNode.classList.add('todo');

  const left = document.createElement('div');
  left.classList.add('left');
  const right = document.createElement('div');
  right.classList.add('right');

  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = todo.getTitle();
  
  const completeButton = document.createElement('button');
  completeButton.setAttribute('type', 'button');
  completeButton.classList.add('complete');
  if (todo.getCompleted()) {
    completeButton.classList.add('completed');
    title.classList.add('strikethrough');
  }
  completeButton.addEventListener('click', () => {
    todo.toggleCompleted();
    if (todo.getCompleted()) {
      completeButton.classList.add('completed');
      title.classList.add('strikethrough');
    } else {
      completeButton.classList.remove('completed');
      title.classList.remove('strikethrough');
    }
  });

  left.appendChild(completeButton);
  left.appendChild(title);

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', () => {
    project.deleteTodo(todo);
    todoNode.remove();
  });
  const deleteButtonImg = new Image();
  deleteButtonImg.src = DeleteIcon;
  deleteButton.appendChild(deleteButtonImg);

  right.appendChild(deleteButton);

  todoNode.appendChild(left);
  todoNode.appendChild(right);

  return todoNode;
}

/**
 * Creates the HTML Node for the Add Task button and form.
 * @returns HTML Node of the Add Task button and form.
 */
function drawAddTaskNode(project, projectNode) {
  // Wrapper for button and form
  const addTaskNode = document.createElement('div');
  addTaskNode.classList.add('add-task');

  // Add form
  const addFormNode = document.createElement('form');
  addFormNode.style.display = 'none';
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'button');
  submitButton.textContent = 'Add task';  
  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('type', 'button');
  cancelButton.textContent = 'Cancel';

  submitButton.addEventListener('click', e => {
    e.preventDefault();
    const newTodo = new Todo(titleInput.value);
    project.addTodo(newTodo);
    projectNode.lastElementChild.before(drawTodoNode(newTodo, project));
    titleInput.value = '';
    addFormNode.style.display = 'none';
    addButtonNode.style.display = 'block';
  });

  cancelButton.addEventListener('click', e => {
    e.preventDefault();
    titleInput.value = '';
    addFormNode.style.display = 'none';
    addButtonNode.style.display = 'block';
  });

  addFormNode.appendChild(titleInput);
  addFormNode.appendChild(submitButton);
  addFormNode.appendChild(cancelButton);

  // Add button
  const addButtonNode = document.createElement('button');
  addButtonNode.classList.add('add');
  addButtonNode.textContent = 'Add task';

  addButtonNode.addEventListener('click', () => {
    addFormNode.style.display = 'block';
    addButtonNode.style.display = 'none';
  });

  addTaskNode.appendChild(addButtonNode);
  addTaskNode.appendChild(addFormNode);

  return addTaskNode;
}