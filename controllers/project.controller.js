const firestore = require('../config/db');
const Project = require('../models/project');
const ApiResponse = require('../models/api-response')

class ProjectController{
  constructor() {
    this.collection = "project"
    this.response = new ApiResponse()
  }

  async addProject (data) {
    await firestore.collection(this.collection).doc().set(data);
    return this.response.toApiResponse(this.collection,[data],"Success!");
  };

  async getAllProjects () {
    const projectList = [];
    const data = await firestore.collection(this.collection).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const project = new Project(
          item.data().name,
          item.id,
          item.data().sid,
          item.data().bid,
          item.data().status
        );
        projectList.push(project);
      });

      return this.response.toApiResponse(this.collection,projectList,"Success!");
    }
  };

  async getAllProjectsToWork () {
    const projectList = [];
    const data = await firestore.collection(this.collection)
                  .where("status","==","unassigned")
                  .get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const project = new Project(
          item.data().name,
          item.id,
          item.data().sid,
          item.data().bid,
          item.data().status
        );
        projectList.push(project);
      });

      return this.response.toApiResponse(this.collection,projectList,"Success!");
    }
  };

  async getProject (id){
    const project = firestore.collection(this.collection);
    const data = await project.doc(id).get();

    if (data.empty) {
      this.response.toApiResponseEmpty(this.collection)
    } else {
      return this.response.toApiResponse(
        this.collection,
        [
          new Project(
            data.data().name,
            data.id,
            data.data().sid,
            data.data().bid,
            data.data().status)
        ],
        "Success!");
    }
  };

  async updateProject (data,id) {
    const proyectToUpdate =firestore.collection(this.collection).doc(id);
    await proyectToUpdate.update(data)
    return this.response.toApiResponse(this.collection,[data],"Success!");
  };
}

module.exports = ProjectController
