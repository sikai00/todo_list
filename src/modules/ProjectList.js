class ProjectList {
  constructor(project_list = []) {
    this.project_list = project_list;
  }

  addProject(newProject) {
    this.project_list.push(newProject);
  }

  deleteProject(project) {
    this.project_list = this.project_list.filter(x => x !== project);
  }

  contains(project) {
    return this.project_list.includes(project);
  }
}