const express = require("express");

const SessionController = require("../controllers/session.controller")

const router = express.Router()
const controller = new SessionController()

router.post('/add',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSession = await controller.addSession(body);
      res.status(201).json(newSession);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/all',
  async (req, res, next) => {
    try {
      const sessions = await controller.getAllSessions();
      res.status(200).json(sessions);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const session = await controller.getSession(id);
      res.status(200).json(session);
    } catch (error) {
      next(error);
    }
});

router.patch('/update/:id',
  async (req, res, next) => {
    try {
      const body = req.body;
      const id = req.params.id;
      const session = await controller.updateSession(body, id);
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
});

module.exports = router

