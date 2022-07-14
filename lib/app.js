const express = require('express');

const app = express();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:7890',
};

const db = require('./models/webmd');
db.mongoose
  .connect(db.url, {})
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

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
