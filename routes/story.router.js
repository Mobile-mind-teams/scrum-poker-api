const express = require("express");

const StoryController = require("../controllers/story.controller")

const router = express.Router()
const controller = new StoryController()

///Projects-Story
router.post('/projects-story/add/:id',
  async (req, res, next) => {
    try {
      const body = req.body;
      const id = req.params.id
      const newStory = await controller.addStoryToProject(body, id);
      res.status(201).json(newStory);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/projects-story/all/:id',
  async (req, res, next) => {
    try {
      const stories = await controller.getAllStoriesFromProject(req.params.id);
      res.status(200).json(stories);
    } catch (error) {
      next(error);
    }
});

router.get('/projects-story/:project_id&:story_id',
  async (req, res, next) => {
    try {
      const stories = await controller.getStoryFromProject(req.params.project_id, req.params.story_id);
      res.status(200).json(stories);
    } catch (error) {
      next(error);
    }
});

router.patch('/projects-story/update/:project_id&:story_id',
  async (req, res, next) => {
    try {
      const user = await controller.updateStoryFromProject(req.body, req.params.project_id, req.params.story_id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
});



// router.get('/:id',
//   async (req, res, next) => {
//     try {
//       const user = await controller.getUser(req.params.id);
//       res.status(200).json(user);
//     } catch (error) {
//       next(error);
//     }
// });

module.exports = router

