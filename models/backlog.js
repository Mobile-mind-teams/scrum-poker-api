class Backlog {
  constructor(project_name, sesion_id, created_at, modified_at, status) {
          this.project_name = project_name;
          this.sesion_id = sesion_id;
          this.created_at = created_at;
          this.modified_at = modified_at;
          this.status = status;
  }
}

module.exports = Backlog;
