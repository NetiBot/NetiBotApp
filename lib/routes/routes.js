module.exports = (app) => {
  const router = require('express').Router();
  const webmd = require('../controllers/webmds.js');

  router.get('/webmds', webmd.getRandom);
  app.use('/', router);
  router.post('/webmds', webmd.create);
  app.use('/', router);
  router.put('/webmds/:id', webmd.update);
  app.use('/', router);
  router.delete('/webmds/:id', webmd.delete);
  app.use('/', router);
};
