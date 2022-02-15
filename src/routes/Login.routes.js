const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST to login User
router.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  const userToLogin = await User.findOne({ username });

  const userForToken = {
    id: userToLogin?._id,
    username: userToLogin?.username,
  };
  const token = jwt.sign(userForToken, 'jota');

  if (password === userToLogin.password) {
    res
      .send({
        id: userToLogin._id,
        username,
        name: userToLogin.name,
        description: userToLogin.description,
        links: userToLogin.links,
        image: userToLogin.image,
        background: userToLogin.background,
        token,
      })
      .end();
  } else {
    res.status(401).json({ status: 'Invalid data' }).end();
  }
});

//Middleware
router.use((error, req, res) => {
  console.log(error);
  res.status(400).end();
});

module.exports = router;
