const mongoose = require('mongoose');
const pw = require('./cred/pw');

// Connect to database with mongoose
mongoose
  .connect(pw.uri)
  .then((db) => console.log('\x1b[35m', '| Database is connected |', '\x1b[0m'))
  .catch((error) => console.error(error));

module.exports = mongoose;
