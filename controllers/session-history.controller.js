const { json } = require('body-parser');
const firestore = require('../config/db');
const SessionHistory = require('../models/session-history');

class SessionHistoryController{
  constructor() {}

  async addHistoryEntry (data) {
    await firestore.collection("session-history").doc().set(data);
    return data;
  };

  async getAllSessionHistory () {
    const historyList = [];
    const data = await firestore.collection("session-history").get();

    if (data.empty) {
      return json({message : "No records found"})
    } else {
      data.forEach((item) => {
        const entry = new SessionHistory(
          item.data().admin_id,
          item.data().uid,
          item.data().sid,
          item.data().time_stamp,
          item.data().pid,
          item.id,
          item.data().status
        );
        historyList.push(entry);
      });

      return historyList
    }
  };

  async getAllSessionHistoryByUserId (id) {
    const entries = firestore.collection("session-history");
    const data = await entries.where("uid","==",id).get();
    const historyList = [];

    if (data.empty) {
      return json({message : "No records found"})
    } else {
      data.forEach((item) => {
        const entry = new SessionHistory(
          item.data().admin_id,
          item.data().uid,
          item.data().sid,
          item.data().time_stamp,
          item.data().pid,
          item.id,
          item.data().status
        );
        historyList.push(entry);
      });

      return historyList
    }
  };

  async deleteSessionHistoryByStatus (status) {
    const data = await firestore.collection("session-history")
                                .where("status", "==", status)
                                .get();

    if (data.empty) {
      return {"message": "No records found" }
    } else {
      data.forEach((item) => {
          firestore.collection("session-history")
          .doc(item.id)
          .delete()
      });

      return {"message": "Records deleted!"}
    }
  }

  async updateSessionHistoryEntry (data,id) {
    const entryToUpdate = firestore.collection("session-history").doc(id);
    await entryToUpdate.update(data)
    return data;
  };
}

module.exports = SessionHistoryController
