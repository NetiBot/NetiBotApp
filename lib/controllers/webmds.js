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
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  const id = req.params.id;
  Webmd.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update conditions and treatments with id=${id}. Maybe conditions and treatments were not found!`,
        });
      } else res.send(data);
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating conditions and treatments with id=' + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Webmd.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete conditions and treatments with id=${id}. Maybe conditions and treatments was not found!`,
        });
      } else {
        res.send({
          message: 'conditions and treatments were deleted successfully!',
        });
      }
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete conditions and treatments with id=' + id,
      });
    });
};
