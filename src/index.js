import '../node_modules/normalize.css';
import './style.css';
import Todo from './modules/Todo';
import Project from './modules/Project';
import ProjectList from './modules/ProjectList';
import drawProjectNode from './modules/UI/ProjectUI';
import {drawProjectListNode, drawProjectListingNode, drawAddProjectButtonNode} from './modules/UI/ProjectListUI';
import drawNavbar from './modules/UI/NavbarUI';

const todo_list = [
  new Todo('hi'),
  new Todo('jelloaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
  new Todo('cello'),
  new Todo('bello'),
  new Todo('hello'),
]

const todo_list_2 = [
  new Todo('Butter'),
  new Todo('Milk'),
  new Todo('Flour'),
  new Todo('Sugar'),
  new Todo('Vanilla Extract'),
]

const todo_list_3 = [
  new Todo('Coffee beans'),
  new Todo('Tea leaves'),
]

const project_list = new ProjectList([
  new Project('today', todo_list),
  new Project('tmrw', todo_list_2),
  new Project('dw', todo_list_3),
]);

// Navbar
const navbar = drawNavbar();

// Container
const container = document.createElement('div');
container.classList.add('container');

// Todos' container
const main = document.createElement('div');
main.classList.add('main');

// Project listings
const projectListNode = drawProjectListNode(project_list);
projectListNode.childNodes.forEach(
  listing => listing.addEventListener(
    'click', 
    () => {
      main.textContent = ''; // Wipes any content from previous project
      main.appendChild(
        drawProjectNode(project_list.getProject(listing.textContent))
      );
      projectListNode.childNodes.forEach(x => x.classList.remove('active-listing'));
      listing.classList.add('active-listing');
    }
  )
);
projectListNode.childNodes[0].click(); // Default project selected

// Add project button and form
const addProjectNode = drawAddProjectButtonNode();
projectListNode.appendChild(addProjectNode);

const addProjectButtonNode = addProjectNode.querySelector('.add-button');
const addProjectFormNode = addProjectNode.querySelector('form');

addProjectButtonNode.addEventListener('click', () => {
  addProjectFormNode.style.display = 'block';
  addProjectButtonNode.style.display = 'none';
});

// Buttons in add project form
const submitProjectButton = addProjectFormNode.querySelector('.submit-project');
const cancelProjectButton = addProjectFormNode.querySelector('.cancel-project');
const titleInput = addProjectNode.querySelector('input[type="text"]');

submitProjectButton.addEventListener('click', e => {
  e.preventDefault();
  if (titleInput.value === '') {
    alert('Project titles must be not be empty.');
    return;
  }
  const newProject = new Project(titleInput.value);
  if (!project_list.addProject(newProject)) {
    alert('Project titles must be unique.')
    return;
  }
  const newProjectNode = drawProjectListingNode(newProject);
  projectListNode.lastElementChild.before(newProjectNode);
  titleInput.value = '';
  addProjectFormNode.style.display = 'none';
  addProjectButtonNode.style.display = 'block';  
  newProjectNode.addEventListener(
    'click', 
    () => {
      main.textContent = '';
      main.appendChild(
        drawProjectNode(project_list.getProject(newProjectNode.textContent)));
      projectListNode.childNodes.forEach(x => x.classList.remove('active-listing'));
      newProjectNode.classList.add('active-listing');
    }
  );
});

cancelProjectButton.addEventListener('click', e => {
  e.preventDefault();
  titleInput.value = '';
  addProjectButtonNode.style.display = 'block';
  addProjectFormNode.style.display = 'none';
});


document.body.appendChild(navbar);
document.body.appendChild(container);
container.appendChild(projectListNode);
container.appendChild(main);