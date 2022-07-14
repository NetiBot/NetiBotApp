const { Router } = require('express');
module.exports = (app) => {
  const webmd = require('../controllers/webmds.js');

  // Create a new Tutorial
  Router().get('/webmds', webmd.getRandom);
  app.use('/webmds', Router);
};

module.exports = Router();
