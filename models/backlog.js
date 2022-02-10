class Backlog {
  constructor(
    project_id,
    project_name,
    sesion_id,
    created_at,
    modified_at,
    status,
    bid
    ) {
          this.project_id = project_id;
          this.project_name = project_name;
          this.sesion_id = sesion_id;
          this.created_at = created_at;
          this.modified_at = modified_at;
          this.status = status;
          this.bid = bid
  }
}

module.exports = Backlog;
