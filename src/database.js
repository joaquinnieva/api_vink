const mongoose = require('mongoose');
const URI =
  'mongodb+srv://joaquinnieva:talleres2001@cluster0.z8nrw.mongodb.net/vinkDatabase?retryWrites=true&w=majority';

// Connect to database with mongoose
mongoose
  .connect(URI)
  .then((db) => console.log('\x1b[35m', '| Database is connected |', '\x1b[0m'))
  .catch((error) => console.error(error));

module.exports = mongoose;
