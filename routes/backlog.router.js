const express = require("express");

const BacklogController = require("../controllers/backlog.controller")

const router = express.Router()
const controller = new BacklogController()

router.post('/add',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBacklog = await controller.addBacklog(body);
      res.status(201).json(newBacklog);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/all',
  async (req, res, next) => {
    try {
      const backlogList = await controller.getAllBacklogs();
      res.status(200).json(backlogList);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id
      const backlog = await controller.getBacklog(id);
      res.status(200).json(backlog);
    } catch (error) {
      next(error);
    }
});

router.patch('/update/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id
      const body = req.body
      const user = await controller.updateBacklog(body, id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
});

module.exports = router

