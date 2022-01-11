const { json } = require('body-parser');
const firestore = require('../config/db');
// const Story = require('../models/story');
const StoryProject = require('../models/story-project');

class StoryController{
  constructor() {}

  //Project-Stories
  async addStoryToProject (data, id) {
    await firestore.collection("project").doc(id).collection("story").doc().set(data);
    return data;
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

  async getStoryFromProject (project_id, story_id){
    const story = firestore.collection("project").doc(project_id);
    const data = await story.collection("story").doc(story_id).get();
    const storyResult = [];

    if (data.empty) {
      json({ message: "No records found" });
    } else {
      const story = new StoryProject(
        data.data().title,
        data.data().description,
        data.id
      );

      storyResult.push(story)
      return storyResult
    }
  };

  async updateStoryFromProject (data, project_id, story_id) {
    const storyToUpdate =firestore.collection("project").doc(project_id);
    await storyToUpdate.collection("story").doc(story_id).update(data)
    return data;
  };

  // //Backlog-Stories
  // async getAllStoriesFromBacklog (id) {
  //   const storyList = [];
  //   const data = await firestore.collection("backlog").doc(id).collection("story").get();

  //   if (data.empty) {
  //     return json({message : "No records found"})
  //   } else {
  //     data.forEach((item) => {
  //       const story = new Story(
  //         item.data().title,
  //         item.data().description,
  //         item.data().weight
  //       );
  //       storyList.push(story);
  //     });
  //     return storyList
  //   }
  // };

  // //Session-Stories
  // async getAllStoriesFromSession (id) {
  //   const storyList = [];
  //   const data = await firestore.collection("session").doc(id).collection("story").get();

  //   if (data.empty) {
  //     return json({message : "No records found"})
  //   } else {
  //     data.forEach((item) => {
  //       const story = new Story(
  //         item.data().title,
  //         item.data().description,
  //         item.data().read_status,
  //         item.data().agreed_status,
  //         item.data().visibility,
  //         item.data().weight,
  //         item.data().note
  //       );
  //       storyList.push(story);
  //     });
  //     return storyList
  //   }
  // };

  // async updateUser (data,id) {
  //   const userToUpdate =firestore.collection("user").doc(id);
  //   await userToUpdate.update(data)
  //   return data;
  // };
}

module.exports = StoryController
