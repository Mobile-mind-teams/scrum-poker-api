const firestore = require('../config/db');
const SessionHistory = require('../models/session-history');
const ApiResponse = require('../models/api-response')

class SessionHistoryController{
  constructor() {
    this.collection = "session-history"
    this.response = new ApiResponse()
  }

  async addHistoryEntry (data) {
    await firestore.collection(this.collection).doc().set(data);
    return this.response.toApiResponse(this.collection,[data],"Success");
  };

  async getAllSessionHistory () {
    const historyList = [];
    const data = await firestore.collection(this.collection).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const entry = new SessionHistory(
          item.data().admin_id,
          item.data().uid,
          item.data().sid,
          item.data().time_stamp,
          item.data().pid,
          item.id,
          item.data().status,
          item.data().project_name
        );
        historyList.push(entry);
      });

      return this.response.toApiResponse(this.collection, historyList, "Success")
    }
  };

  async getAllSessionHistoryByUserId (id) {
    const entries = firestore.collection(this.collection);
    const data = await entries.where("uid","==",id).get();
    const historyList = [];

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const entry = new SessionHistory(
          item.data().admin_id,
          item.data().uid,
          item.data().sid,
          item.data().time_stamp,
          item.data().pid,
          item.id,
          item.data().status,
          item.data().project_name
        );
        historyList.push(entry);
      });

      return this.response.toApiResponse(this.collection, historyList, "Success")
    }
  };

  async deleteSessionHistoryByStatus (status) {
    const data = await firestore.collection(this.collection)
                                .where("status", "==", status)
                                .get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
          firestore.collection("session-history")
          .doc(item.id)
          .delete()
      });

      return this.response.toApiResponse(this.collection,[],"Success");
    }
  }

  async updateSessionHistoryEntry (data,id) {
    const entryToUpdate = firestore.collection(this.collection).doc(id);
    await entryToUpdate.update(data)
    return this.response.toApiResponse(this.collection,[data],"Success");;
  };
}

module.exports = SessionHistoryController
