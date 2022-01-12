const { json } = require('body-parser');
const firestore = require('../config/db');
const Project = require('../models/project');

class ProjectController{
  constructor() {}

  async addProject (data) {
    await firestore.collection("project").doc().set(data);
    return data;
  };

  async getAllProjects () {
    const projectList = [];
    const data = await firestore.collection("project").get();

    if (data.empty) {
      return json({message : "No records found"})
    } else {
      data.forEach((item) => {
        const project = new Project(
          item.data().name,
          item.id
        );
        projectList.push(project);
      });

      return projectList
    }
  };

  async getProject (id){
    const project = firestore.collection("project");
    const data = await project.doc(id).get();

    if (data.empty) {
      json({ message: "No records found" });
    } else {
      return new Project(
        data.data().name,
        data.id
      );
    }
  };

  async updateProject (data,id) {
    const proyectToUpdate =firestore.collection("project").doc(id);
    await proyectToUpdate.update(data)
    return data;
  };
}

module.exports = ProjectController
