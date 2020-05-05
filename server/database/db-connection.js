const mongoose = require('mongoose');
require('dotenv').config()

const db = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, error => {
  return error ? console.warn(err.bgRed) : console.log('[MongoDB] connected to database \u2713 '.bgGreen);
});

module.exports = db;