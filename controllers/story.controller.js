const firestore = require('../config/db');
const StorySession = require('../models/story-session');
const StoryProject = require('../models/story-project');
const StoryBacklog = require('../models/story-backlog');
const ApiResponse = require('../models/api-response')

class StoryController{
  constructor() {
    this.collection = "story"
    this.response = new ApiResponse()
  }

  //Project-Stories
  async addStoryToProject (data, id) {
    await firestore.collection("project").doc(id).collection(this.collection).doc().set(data);
    return this.response.toApiResponse(this.collection,[data], "Success!");
  };

  //Session-Backlog
  async addStoryTo (data, document_id, story_id, collection) {
    await firestore.collection(collection).doc(document_id).collection(this.collection).doc(story_id).set(data);
    return this.response.toApiResponse(collection,[data], "Success!");;
  };

  async updateStoryFrom (data, document_id, story_id, collection) {
    const storyToUpdate = firestore.collection(collection)
                                    .doc(document_id)
                                    .collection(this.collection)
                                    .doc(story_id);
    await storyToUpdate.update(data)
    return this.response.toApiResponse(this.collection,[data], "Success!");;
  };

  async getStoryFrom (document_id, story_id, collection){
    const story = firestore.collection(collection).doc(document_id);
    const data = await story.collection(collection).doc(story_id).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(collection)
    } else {

      switch(collection){
        case "project":
          return this.response.toApiResponse(
            this.collection,
            [new StoryProject(
              data.data().title,
              data.data().description,
              data.id
            )],
            "Success!");
        case "session":
          return this.response.toApiResponse(
            this.collection,
            [new StorySession(
              data.data().title,
              data.data().description,
              data.data().weight,
              data.data().read_status,
              data.data().agreed_status,
              data.data().visibility,
              data.data().note,
              data.id
            )],
            "Success!");
          case "backlog":
            return this.response.toApiResponse(
              this.collection,
              [new StoryBacklog(
                data.data().title,
                data.data().description,
                data.data().weight,
                data.id
              )],
              "Success!");
      }
    }
  };

  async getAllStoriesFromProject (id) {
    const storyList = [];
    const data = await firestore.collection("project").doc(id).collection("story").get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
    } else {
      data.forEach((item) => {
        const story = new StoryProject(
          item.data().title,
          item.data().description,
          item.id
        );
        storyList.push(story);
      });
      return this.response.toApiResponse(this.collection,storyList, "Success!");;
    }
  };

  //Session-Story
  async getAllStoriesFromSession (id) {
    const storyList = [];
    const stories = firestore.collection("session")
                                .doc(id)
                                .collection("story")
    const data = await stories.where("agreed_status", "==", false)
                                .get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
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
      return this.response.toApiResponse(this.collection,storyList, "Success!");;
    }
  };

  async getAllAgreedStoriesFromSession (id) {
    const storyList = [];
    const stories = firestore.collection("session")
                                .doc(id)
                                .collection(this.collection)
    const data = await stories.where("agreed_status", "==", true)
                                .get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
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
      return this.response.toApiResponse(this.collection,storyList, "Success!");;
    }
  };

  //Backlog-Stories
  async getAllStoriesFromBacklog (id) {
    const storyList = [];
    const data = await firestore.collection("backlog").doc(id).collection(this.collection).get();

    if (data.empty) {
      return this.response.toApiResponseEmpty(this.collection)
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
      return this.response.toApiResponse(this.collection,storyList, "Success!");;
    }
  };
}

module.exports = StoryController
