const express = require("express");

const EmailController = require("../controllers/email.controller")

const router = express.Router()
const controller = new EmailController()

router.post('/send',
  async (req, res, next) => {
    try {
      const body = req.body;
      await controller.sendEmail(body, res)
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router

