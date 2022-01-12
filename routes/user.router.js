const express = require("express");

const UsersController = require("../controllers/users.controller")

const router = express.Router()
const controller = new UsersController()

router.post('/add',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await controller.addUser(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/all',
  async (req, res, next) => {
    try {
      const users = await controller.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await controller.getUser(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
});

router.patch('/update/:id',
  async (req, res, next) => {
    try {
      const body = req.body;
      const id = req.params.id;
      const user = await controller.updateUser(body, id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
});

module.exports = router

