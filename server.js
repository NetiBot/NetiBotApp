const pool = require('./lib/utils/pool');
const app = require('./lib/app');

const API_URL = process.env.API_URL || 'http://localhost';
const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`🚀  Server started on ${API_URL}:${PORT}`); //eslint-disable-line
});

process.on('exit', () => {
  console.log('👋  Goodbye!'); //eslint-disable-line
  pool.end();
});
