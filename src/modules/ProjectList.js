export default class ProjectList {
  constructor(project_list = []) {
    this.project_list = project_list;
    this.project_titles = new Set();
    this.project_list.forEach(project => {
      this.project_titles.add(project.getTitle());
    });
  }

  getProjects() {
    return this.project_list;
  }

  getProject(projectName) {
    return this.project_list.find(project => project.getTitle() === projectName);
  }

  addProject(newProject) {
    if (!this.project_titles.has(newProject.getTitle())) {
      this.project_list.push(newProject);
      return true;
    } else {
      return false;
    }
  }

  deleteProject(projectName) {
    this.project_list = this.project_list.filter(x => x.getTitle() !== projectName);
  }

  contains(project) {
    return this.project_list.includes(project);
  }
}