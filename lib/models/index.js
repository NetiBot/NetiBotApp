const dbConfig = require('../../config/db.config.js');
// const { Router } = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.webmd = require('./Webmd.js')(mongoose);
module.exports = db;

// module.exports = Router();