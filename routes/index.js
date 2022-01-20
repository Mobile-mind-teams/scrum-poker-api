const express = require('express');

const userRouter = require('../routes/user.router');
const projectRouter = require('../routes/project.router');
const storyRouter = require('../routes/story.router');
const backlogRouter = require('../routes/backlog.router');
const sessionRouter = require('../routes/session.router');
const tableCardRouter = require('../routes/table-cards.router');
const sessionHistoryRouter = require('./session-history.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/scrum-poker/v1', router);
  router.use('/users', userRouter);
  router.use('/projects', projectRouter);
  router.use('/stories', storyRouter);
  router.use('/backlogs', backlogRouter);
  router.use('/sessions', sessionRouter);
  router.use('/table-cards', tableCardRouter);
  router.use('/session-history', sessionHistoryRouter);
}

module.exports = routerApi
