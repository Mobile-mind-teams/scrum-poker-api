class TableCard {

  constructor(
    user_id,
    value,
    action,
    visibility,
    story_id,
    doc_id,
    name
    ) {
          this.user_id = user_id;
          this.value = value;
          this.action = action;
          this.visibility = visibility;
          this.story_id = story_id;
          this.doc_id = doc_id;
          this.name = name;
  }
}

module.exports = TableCard;
