import '../node_modules/normalize.css';
import './style.css';
import Project from './modules/Project';
import ProjectUI from './modules/UI/ProjectUI';
import {drawProjectListNode, drawProjectListingNode, drawAddProjectButtonNode} from './modules/UI/ProjectListUI';
import drawNavbar from './modules/UI/NavbarUI';
import { populateStorage, getProjectListFromStorage } from './modules/Storage';

const project_list = getProjectListFromStorage();
const projectUI = new ProjectUI(project_list);

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
  listing => {
    listing.addEventListener(
      'click', 
      () => {
        main.textContent = ''; // Wipes any content from previous project
        main.appendChild(
          projectUI.drawProjectNode(project_list.getProject(listing.textContent))
        );
        projectListNode.childNodes.forEach(x => x.classList.remove('active-listing'));
        listing.classList.add('active-listing');
      }
    );
    listing.querySelector('.delete-listing').addEventListener(
      'click',
      e => {
        e.stopImmediatePropagation(); // prevent parent click event
        project_list.deleteProject(listing.textContent);
        listing.remove();
        populateStorage(project_list);
        // look in the projectlistnodes, if there is an active listing, don't click
        if (!projectListNode.querySelector('.active-listing') && projectListNode.childElementCount !== 1) {
          main.textContent = '';
          projectListNode.childNodes[0].querySelector('div').click();
        } else if (projectListNode.childElementCount === 1) {
          // only add project button is left
          main.textContent = '';
        }
      }
    );
  }
);
if (projectListNode.childElementCount != 0) {
  projectListNode.childNodes[0].querySelector('div').click(); // Default project selected
}

// Add project button and form
const addProjectNode = drawAddProjectButtonNode();
projectListNode.appendChild(addProjectNode);

const addProjectButtonNode = addProjectNode.querySelector('button');
const addProjectFormNode = addProjectNode.querySelector('form');

addProjectButtonNode.addEventListener('click', () => {
  addProjectFormNode.style.display = 'grid';
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
  populateStorage(project_list);
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
        projectUI.drawProjectNode(project_list.getProject(newProjectNode.textContent)));
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