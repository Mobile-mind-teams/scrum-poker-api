const express = require("express");

const CardController = require("../controllers/card.controller")

const router = express.Router()
const controller = new CardController()

router.post('/add',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBacklog = await controller.addCard(body);
      res.status(201).json(newBacklog);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/all/:type',
  async (req, res, next) => {
    try {
      const type = req.params.type
      const deck = await controller.getDeckFor(type);
      res.status(200).json(deck);
    } catch (error) {
      next(error);
    }
});


router.get('/all',
  async (req, res, next) => {
    try {
      const deck = await controller.getAllCards();
      res.status(200).json(deck);
    } catch (error) {
      next(error);
    }
});

router.delete('/delete/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id
      const deletedCard = await controller.deleteCard(id);
      res.status(200).json(deletedCard);
    } catch (error) {
      next(error);
    }
});

router.patch('/update/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id
      const body = req.body
      const card = await controller.updateCardData(body, id);
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
});

module.exports = router

