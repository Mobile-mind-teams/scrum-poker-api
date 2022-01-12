const { json } = require('body-parser');
const firestore = require('../config/db');
const StorySession = require('../models/story-session');
const StoryProject = require('../models/story-project');
const StoryBacklog = require('../models/story-backlog');

class StoryController{
  constructor() {}

  //Project-Stories
  async addStoryToProject (data, id) {
    await firestore.collection("project").doc(id).collection("story").doc().set(data);
    return data;
  };

  //Session-Backlog
  async addStoryTo (data, document_id, story_id, collection) {
    await firestore.collection(collection).doc(document_id).collection("story").doc(story_id).set(data);
    return data;
  };

  async updateStoryFrom (data, project_id, story_id, collection) {
    const storyToUpdate =firestore.collection(collection).doc(project_id);
    await storyToUpdate.collection("story").doc(story_id).update(data)
    return data;
  };

  async getStoryFrom (document_id, story_id, collection){
    const story = firestore.collection(collection).doc(document_id);
    const data = await story.collection("story").doc(story_id).get();

    if (data.empty) {
      json({ message: "No records found" });
    } else {

      switch(collection){
        case "project":
          return new StoryProject(
            data.data().title,
            data.data().description,
            data.id
          );
        case "session":
          return new StorySession(
            data.data().title,
            data.data().description,
            data.data().weight,
            data.data().read_status,
            data.data().agreed_status,
            data.data().visibility,
            data.data().note,
            data.id
          );
          case "backlog":
            return new StoryBacklog(
              data.data().title,
              data.data().description,
              data.data().weight,
              data.id
            );
      }
    }
  };

  async getAllStoriesFromProject (id) {
    const storyList = [];
    const data = await firestore.collection("project").doc(id).collection("story").get();

    if (data.empty) {
      return json({message : "No records found"})
    } else {
      data.forEach((item) => {
        const story = new StoryProject(
          item.data().title,
          item.data().description,
          item.id
        );
        storyList.push(story);
      });
      return storyList
    }
  };

  //Session-Story
  async getAllStoriesFromSession (id) {
    const storyList = [];
    const data = await firestore.collection("session").doc(id).collection("story").get();

    if (data.empty) {
      return json({message : "No records found"})
    } else {
      data.forEach((item) => {
        const story = new StorySession(
          item.data().title,
          item.data().description,
          item.data().weight,
          item.data().read_status,
          item.data().agreed_status,
          item.data().visibility,
          item.data().note,
          item.id
        );
        storyList.push(story);
      });
      return storyList
    }
  };

  //Backlog-Stories
  async getAllStoriesFromBacklog (id) {
    const storyList = [];
    const data = await firestore.collection("backlog").doc(id).collection("story").get();

    if (data.empty) {
      return json({message : "No records found"})
    } else {
      data.forEach((item) => {
        const story = new StoryBacklog(
          item.data().title,
          item.data().description,
          item.data().weight,
          item.id
        );
        storyList.push(story);
      });
      return storyList
    }
  };
}

module.exports = StoryController
