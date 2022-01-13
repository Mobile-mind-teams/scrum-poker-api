const { json } = require('body-parser');
const firestore = require('../config/db');
const Session = require('../models/session');

class SessionController{
  constructor() {}

  async addSession (data) {
    await firestore.collection("session").doc().set(data);
    return data;
  };

  async getAllSessions () {
    const sessionList = [];
    const data = await firestore.collection("session").get();

    if (data.empty) {
      return json({message : "No records found"})
    } else {
      data.forEach((item) => {
        const session = new Session(
          item.data().project_id,
          item.data().project_name,
          item.data().status,
          item.data().started_at,
          item.data().finished_at,
          item.data().note,
          item.id
        );
        sessionList.push(session);
      });

      return sessionList
    }
  };

  async getSession (id){
    const session = firestore.collection("session");
    const data = await session.doc(id).get();

    if (data.empty) {
      json({ message: "No records found" });
    } else {
      return new Session(
        data.data().project_id,
        data.data().project_name,
        data.data().status,
        data.data().started_at,
        data.data().finished_at,
        data.data().note,
        data.id
      );
    }
  };

  async updateSession (data,id) {
    const sessionToUpdate =firestore.collection("session").doc(id);
    await sessionToUpdate.update(data)
    return data;
  };
}

module.exports = SessionController
