// const db = require('../models');
// const { Router } = require('express');
// const Webmd = db.webmd;
// exports.findRandom = (req, res) => {
//   Webmd.aggregate([{ $sample: { size: 1 } }])
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving tutorials.',
//       });
//     });
// };

// module.exports = Router();
const mongoose = require('mongoose');
const db = require('../models/index.js');
const { Router } = require('express');
const Webmd = require('../models/Webmd.js')(mongoose);
module.exports = Router().get('/', async (req, res) => {
  Webmd.aggregate
    .sample(1)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
});
