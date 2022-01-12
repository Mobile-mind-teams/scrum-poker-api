const express = require('express');

const userRouter = require('../routes/user.router');
const projectRouter = require('../routes/project.router');
const storyRouter = require('../routes/story.router');
const backlogRouter = require('../routes/backlog.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/scrum-poker/v1', router);
  router.use('/users', userRouter);
  router.use('/projects', projectRouter);
  router.use('/stories', storyRouter);
  router.use('/backlog', backlogRouter);
}

module.exports = routerApi
