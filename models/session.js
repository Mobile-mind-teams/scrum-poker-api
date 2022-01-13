class Session {

  constructor(
    project_id,
    project_name,
    status,
    started_at,
    finished_at,
    note,
    session_id) {
          this.project_id = project_id;
          this.project_name = project_name;
          this.started_at = started_at;
          this.finished_at = finished_at;
          this.note = note;
          this.status = status;
          this.session_id = session_id;
  }
}

module.exports = Session;
