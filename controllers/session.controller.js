const firestore = require('../config/db');
const Session = require('../models/session');
const ApiResponse = require('../models/api-response')

class SessionController{
  constructor() {
    this.collection = "session"
    this.response = new ApiResponse()
  }

  async addSession (data) {
    await firestore.collection(this.collection).doc().set(data);
    return this.response.toApiResponse(this.collection, [data], "Success!");
  };

  async getAllSessions () {
    const sessionList = [];
    const data = await firestore.collection(this.collection).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const session = new Session(
          item.data().project_id,
          item.data().project_name,
          item.data().status,
          item.data().started_at,
          item.data().finished_at,
          item.data().note,
          item.id,
          item.data().admin_id,
          item.data().team
        );
        sessionList.push(session);
      });

      return this.response.toApiResponse(this.collection, sessionList, "Success!")
    }
  };

  async getAllSessionsByAdminId (id) {
    const sessionList = [];
    const data = await firestore.collection(this.collection)
                        .where("admin_id","==",id).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const session = new Session(
          item.data().project_id,
          item.data().project_name,
          item.data().status,
          item.data().started_at,
          item.data().finished_at,
          item.data().note,
          item.id,
          item.data().admin_id,
          item.data().team
        );
        sessionList.push(session);
      });

      return this.response.toApiResponse(this.collection, sessionList, "Success!")
    }
  };

  async getSessionsByIdAndStatus (id,status) {
    const sessionList = [];
    const data = await firestore.collection(this.collection)
                        .where("admin_id","==",id)
                        .where("status","==",status)
                        .get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const session = new Session(
          item.data().project_id,
          item.data().project_name,
          item.data().status,
          item.data().started_at,
          item.data().finished_at,
          item.data().note,
          item.id,
          item.data().admin_id,
          item.data().team
        );
        sessionList.push(session);
      });

      return this.response.toApiResponse(this.collection, sessionList, "Success!")
    }
  };

  async getSession (id){
    const session = firestore.collection(this.collection);
    const data = await session.doc(id).get();

    if (!data.exists) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      const session_result = new Session(
        data.data().project_id,
        data.data().project_name,
        data.data().status,
        data.data().started_at,
        data.data().finished_at,
        data.data().note,
        data.id,
        data.data().admin_id,
        data.data().team
      );

      return this.response.toApiResponse(this.collection, [session_result], "Success!")
    }
  };

  async getSessionByTeamMemberEmail (email){
    const sessionList = [];
    const data = await firestore.collection(this.collection)
                        .where("team","array-contains",email)
                        .get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const session = new Session(
          item.data().project_id,
          item.data().project_name,
          item.data().status,
          item.data().started_at,
          item.data().finished_at,
          item.data().note,
          item.id,
          item.data().admin_id,
          item.data().team
        );
        sessionList.push(session);
      });

      return this.response.toApiResponse(this.collection, sessionList, "Success!")
    }
  };

  async updateSession (data,id) {
    const sessionToUpdate =firestore.collection("session").doc(id);
    await sessionToUpdate.update(data)
    return this.response.toApiResponse(this.collection, [data], "Success!");
  };
}

module.exports = SessionController
