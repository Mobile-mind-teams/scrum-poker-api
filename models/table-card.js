class TableCard {

  constructor(
    user_id,
    value,
    description,
    visibility,
    story_id,
    doc_id
    ) {
          this.value = value;
          this.description = description;
          this.user_id = user_id;
          this.visibility = visibility;
          this.story_id = story_id;
          this.doc_id = doc_id;
  }
}

module.exports = TableCard;
