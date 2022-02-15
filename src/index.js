const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');

// Database connection
const { mongoose } = require('./database.js');

// Settings
app.set('port', process.env.PORT || 3001);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user', require('./routes/User.routes'));
app.use('/api/login', require('./routes/Login.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
  console.log('\x1b[35m', `|  Server on port ${app.get('port')}  |`);
});
