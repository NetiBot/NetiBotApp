module.exports = (app) => {
  const router = require('express').Router();
  const webmd = require('../controllers/webmds.js');

  // Create a new Tutorial
  router.get('/webmds', webmd.getRandom);
  app.use('/', router);
};

// module.exports = router;
