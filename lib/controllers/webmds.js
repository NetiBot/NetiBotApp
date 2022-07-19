const db = require('../models/index');
const Webmd = db.webmd;
exports.getRandom = (req, res) => {
  Webmd.aggregate()
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
};
exports.create = (req, res) => {
  if (!req.body.diagnosis) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  const webmd = new Webmd({
    diagnosis: req.body.diagnosis,
    treatment: req.body.treatment,
  });
  webmd
    .save(webmd)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the condition.',
      });
    });
};
