import Project from "./Project";
import ProjectList from "./ProjectList";
import Todo from "./Todo";

export function populateStorage(projectList) {
  localStorage.setItem('projectList', JSON.stringify(projectList));
  console.log(projectList);
}

export function getProjectListFromStorage() {
  if (!localStorage.getItem('projectList')) {
    return new ProjectList();
  }

  const projectList = JSON.parse(localStorage.getItem('projectList'));
  const tempProjectList = new ProjectList();
  for (let p of projectList.project_list) {
    const tempProject = new Project(p.title);
    for (let t of p.todo_list) {
      const tempDate = t.dueDate != null ? new Date(t.dueDate) : null;
      tempProject.addTodo(new Todo(t.title, t.description, tempDate, t.priority, t.completed));
    }
    tempProjectList.addProject(tempProject);
  }
  return tempProjectList;
}