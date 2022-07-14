const db = require('../models');
const { Router } = require('express');
const Webmd = db.webmd;
exports.findRandom = (req, res) => {
  Webmd.aggregate([{ $sample: { size: 1 } }])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

module.exports = Router();
