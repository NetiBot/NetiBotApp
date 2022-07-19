module.exports = (app) => {
  const router = require('express').Router();
  const webmd = require('../controllers/webmds.js');

  router.get('/webmds', webmd.getRandom);
  app.use('/', router);
  router.post('/webmds', webmd.create);
  app.use('/', router);
};
