const express = require('express');

const userRouter = require('../routes/user.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/scrum-poker/v1', router);
  router.use('/users', userRouter);
}

module.exports = routerApi
