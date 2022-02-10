const express = require("express");

const TableCardController = require("../controllers/table-cards.controller")

const router = express.Router()
const controller = new TableCardController()

router.post('/add/:document_id',
  async (req, res, next) => {
    try {
      const body = req.body;
      const document_id = req.params.document_id;
      const newCard = await controller.addCard(body, document_id);
      res.status(201).json(newCard);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/all/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id
      const cards = await controller.getAllCards(id);
      res.status(200).json(cards);
    } catch (error) {
      next(error);
    }
});

router.get('/:document_id&:card_id',
  async (req, res, next) => {
    try {
      const document_id = req.params.document_id
      const card_id = req.params.card_id
      const card = await controller.getCard(document_id, card_id);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
});

router.patch('/update/:document_id&:card_id',
  async (req, res, next) => {
    try {
      const body = req.body;
      const document_id = req.params.document_id
      const card_id = req.params.card_id
      const card = await controller.updateTableCard(body, document_id, card_id);
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
});

router.delete('/reset-table/:document_id&:story_id',
  async (req, res, next) => {
    try {
      const document_id = req.params.document_id;
      const story_id = req.params.story_id;
      const result = await controller.resetTable(document_id, story_id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
});

module.exports = router

