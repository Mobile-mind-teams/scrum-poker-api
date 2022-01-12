const { json } = require('body-parser');
const firestore = require('../config/db');
const Backlog = require('../models/backlog');

class BacklogController{
  constructor() {}

  async addBacklog (data) {
    await firestore.collection("backlog").doc().set(data);
    return data;
  };

  async getAllBacklogs () {
    const backlogList = [];
    const data = await firestore.collection("backlog").get();

    if (data.empty) {
      return json({message : "No records found"})
    } else {
      data.forEach((item) => {
        const backlog = new Backlog(
          item.data().project_id,
          item.data().project_name,
          item.data().session_id,
          item.data().created_at,
          item.data().modified_at,
          item.data().status,
          item.id
        );
        backlogList.push(backlog);
      });

      return backlogList
    }
  };

  async getBacklog (id){
    const backlog = firestore.collection("backlog");
    const data = await backlog.doc(id).get();

    if (data.empty) {
      json({ message: "No records found" });
    } else {
      return new Backlog(
        data.data().project_id,
        data.data().project_name,
        data.data().session_id,
        data.data().created_at,
        data.data().modified_at,
        data.data().status,
        data.id
      );
    }
  };

  async updateBacklog (data,id) {
    const backlogToUpdate =firestore.collection("backlog").doc(id);
    await backlogToUpdate.update(data)
    return data;
  };
}

module.exports = BacklogController
