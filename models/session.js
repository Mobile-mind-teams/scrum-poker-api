class Session {

  constructor(project_id, project_name, status, started_at, finished_at, note, story_list) {
          this.project_id = project_id;
          this.project_name = project_name;
          this.started_at = started_at;
          this.finished_at = finished_at;
          this.note = note;
          this.status = status;
          this.story_list = story_list;
  }
}

module.exports = Session;
