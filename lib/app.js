const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:7890',
};
const dbConfig = require('../config/db.config.js');
const db = require('./models');

db.url = dbConfig.url;
mongoose
  .connect(db.url)
  .then(() => {
    console.log('Connected to the database!'); //eslint-disable-line
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err); //eslint-disable-line
    process.exit();
  });

app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.json({ message: 'Your NetiBot has arrived.' });
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require('./routes/routes')(app);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
