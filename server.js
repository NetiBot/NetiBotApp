// const app = require('./lib/app');
const pool = require('./lib/utils/pool');
// const route = require('./lib/routes/routes.js');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const Router = require('./lib/routes/routes');
const corsOptions = {
  origin: 'http://localhost:7890',
};
const dbConfig = require('./config/db.config.js');

const db = require('./lib/models');
db.url = dbConfig.url;
mongoose
  .connect(db.url)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.json({ message: 'Your NetiBot has arrived.' });
});

// Built in middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// App routes
app.use('/webmds', Router);

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./lib/middleware/not-found'));
app.use(require('./lib/middleware/error'));

const API_URL = process.env.API_URL || 'http://localhost';
const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`🚀  Server started on ${API_URL}:${PORT}`);
});

process.on('exit', () => {
  console.log('👋  Goodbye!');
  pool.end();
});
