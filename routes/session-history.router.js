const express = require("express");

const SessionHistoryController = require("../controllers/session-history.controller")

const router = express.Router()
const controller = new SessionHistoryController()

router.post('/add',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newInvitation = await controller.addHistoryEntry(body);
      res.status(201).json(newInvitation);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/users/all/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id
      const invitations = await controller.getAllSessionHistoryByUserId(id);
      res.status(200).json(invitations);
    } catch (error) {
      next(error);
    }
});

router.get('/po-sm/all',
  async (req, res, next) => {
    try {
      const invitations = await controller.getAllSessionHistory();
      res.status(200).json(invitations);
    } catch (error) {
      next(error);
    }
});

router.delete('/:status',
  async (req, res, next) => {
    try {
      const status = req.params.status;
      const invitation = await controller.deleteSessionHistoryByStatus(status);
      res.status(200).json(invitation);
    } catch (error) {
      next(error);
    }
});

router.patch('/update/:id',
  async (req, res, next) => {
    try {
      const body = req.body;
      const id = req.params.id;
      const invitation = await controller.updateSessionHistoryEntry(body, id);
      res.status(201).json(invitation);
    } catch (error) {
      next(error);
    }
});

module.exports = router

