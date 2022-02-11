const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST to login User
router.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  const userlog = await User.findOne({ username });

  const userForToken = {
    id: userlog?._id,
    username: userlog?.username,
  };
  const token = jwt.sign(userForToken, 'jota');

  if (password === userlog.password) {
    res.send({ username, password, token }).end();
  } else {
    res.status(401).json({ status: 'invalid data' }).end();
  }
});

//Middleware
router.use((error, req, res) => {
  console.log(error);
  res.status(400).end();
});

module.exports = router;
