const express = require("express");

const ProjectController = require("../controllers/project.controller")

const router = express.Router()
const controller = new ProjectController()

router.post('/add',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newStory = await controller.addProject(body);
      res.status(201).json(newStory);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/all',
  async (req, res, next) => {
    try {
      const projects = await controller.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  async (req, res, next) => {
    try {
      const project = await controller.getProject(req.params.id);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
});

router.patch('/update/:id',
  async (req, res, next) => {
    try {
      const project = await controller.updateProject(req.body, req.params.id);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
});

module.exports = router

