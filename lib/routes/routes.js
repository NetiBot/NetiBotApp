module.exports = (app) => {
  // console.log(app);
  const router = require('express').Router();
  const webmd = require('../controllers/webmds.js');

  // Create a new Tutorial
  router.get('/webmds', webmd.getRandom);
  app.use('/', router);
  // router.post('/webmds', webmd.create);
  // app.use('/', router);
};

// module.exports = router;
