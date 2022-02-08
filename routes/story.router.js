const express = require("express");

const StoryController = require("../controllers/story.controller")

const router = express.Router()
const controller = new StoryController()

router.post('/add/:document_id&:story_id&:collection',
  async (req, res, next) => {
    try {
      const body = req.body;
      const document_id = req.params.document_id;
      const story_id = req.params.story_id;
      const collection = req.params.collection;
      const newStory = await controller.addStoryTo(body, document_id, story_id, collection);
      res.status(201).json(newStory);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-project/:id',
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

router.get('/:document_id&:story_id&:collection',
  async (req, res, next) => {
    try {
      const document_id = req.params.document_id
      const story_id = req.params.story_id
      const collection = req.params.collection
      const story = await controller.getStoryFrom(document_id, story_id, collection);
      res.status(200).json(story);
    } catch (error) {
      next(error);
    }
});

router.patch('/update/:document_id&:story_id&:collection',
  async (req, res, next) => {
    try {
      const body = req.body;
      const document_id = req.params.document_id
      const story_id = req.params.story_id
      const collection = req.params.collection
      const story = await controller.updateStoryFrom(body, document_id, story_id, collection);
      res.status(201).json(story);
    } catch (error) {
      next(error);
    }
});

router.get('/project/all/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id
      const stories = await controller.getAllStoriesFromProject(id);
      res.status(200).json(stories);
    } catch (error) {
      next(error);
    }
});

router.get('/session/all/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id
      const stories = await controller.getAllStoriesFromSession(id);
      res.status(200).json(stories);
    } catch (error) {
      next(error);
    }
});

router.get('/backlog/all/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id
      const stories = await controller.getAllStoriesFromBacklog(id);
      res.status(200).json(stories);
    } catch (error) {
      next(error);
    }
});

module.exports = router

