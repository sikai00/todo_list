import Project from "../Project";
import DeleteIcon from "../../icons/delete.png"

/**
 * Creates the HTML Node for the project list. Note that this function
 * is responsible only for the creation of HTML Nodes.
 * @param {ProjectList} projectList 
 * @returns HTML Node of the list of projects.
 */
export function drawProjectListNode(projectList) {
  const projectListNode = document.createElement('div');
  projectListNode.classList.add('project-list');

  projectList.getProjects().forEach(project => {
    projectListNode.appendChild(drawProjectListingNode(project));
  });

  return projectListNode;
}

/**
 * Creates the HTML Node for each individual project listing.
 * @param {Project} project 
 * @returns HTML Node of each individual project listing
 */
export function drawProjectListingNode(project) {
  const projectListWrapperNode = document.createElement('button');
  projectListWrapperNode.classList.add('project-listing');

  const projectListNode = document.createElement('div');
  projectListNode.textContent = project.getTitle();

  const deleteProjectListNode = document.createElement('button');
  deleteProjectListNode.setAttribute('type', 'button');
  deleteProjectListNode.classList.add('delete-listing');
  const deleteButtonImg = new Image();
  deleteButtonImg.src = DeleteIcon;
  deleteProjectListNode.appendChild(deleteButtonImg);
  
  projectListWrapperNode.appendChild(projectListNode);
  projectListWrapperNode.appendChild(deleteProjectListNode);

  return projectListWrapperNode;
}

/**
 * Creates the HTML Node for the Add Project button and form.
 * @returns HTML Node of the Add Project button and form.
 */
export function drawAddProjectButtonNode() {
  // Wrapper for button and form
  const addProjectNode = document.createElement('div');
  addProjectNode.classList.add('add-project');

  // Add button
  const addButtonNode = document.createElement('button');
  addButtonNode.textContent = 'Add project';

  // Add form
  const addFormNode = document.createElement('form');
  addFormNode.style.display = 'none';

  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'button');
  submitButton.classList.add('submit-project');
  submitButton.textContent = 'Submit';  
  
  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('type', 'button');
  cancelButton.classList.add('cancel-project');
  cancelButton.textContent = 'Cancel';

  addFormNode.appendChild(titleInput);
  addFormNode.appendChild(submitButton);
  addFormNode.appendChild(cancelButton);

  addProjectNode.appendChild(addButtonNode);
  addProjectNode.appendChild(addFormNode);

  return addProjectNode;
}