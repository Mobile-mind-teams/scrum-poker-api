class Story {

  constructor(title, description, weight, read_status, agreed_status, visibility, note) {
          this.title = title;
          this.description = description;
          this.weight = weight;
          this.read_status = read_status;
          this.agreed_status = agreed_status;
          this.visibility = visibility;
          this.note = note;
  }
}

module.exports = Story;
