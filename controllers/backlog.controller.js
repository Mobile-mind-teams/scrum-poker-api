const firestore = require('../config/db');
const Backlog = require('../models/backlog');
const ApiResponse = require('../models/api-response')

class BacklogController{
  constructor() {
    this.collection = "backlog"
    this.response = new ApiResponse()
  }

  async addBacklog (data) {
    await firestore.collection(this.collection).doc().set(data);
    return this.response.toApiResponse(this.collection,[data],"Success!");
  };

  async getAllBacklogs () {
    const backlogList = [];
    const data = await firestore.collection(this.collection).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
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

      return this.response.toApiResponse(this.collection,backlogList,"Success!")
    }
  };

  async getBacklog (id){
    const backlog = firestore.collection(this.collection);
    const data = await backlog.doc(id).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      const result = new Backlog(
        data.data().project_id,
        data.data().project_name,
        data.data().session_id,
        data.data().created_at,
        data.data().modified_at,
        data.data().status,
        data.id
      );

      return this.response.toApiResponse(this.collection,[result],"Success!");
    }
  };

  async updateBacklog (data,id) {
    const backlogToUpdate =firestore.collection(this.collection).doc(id);
    await backlogToUpdate.update(data)
    return this.response.toApiResponse(this.collection,[data],"Success!");
  };
}

module.exports = BacklogController
