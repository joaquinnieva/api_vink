const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');

// GET all User
router.get('/', (req, res, next) => {
  User.find()
    .then((value) => {
      if (value) {
        return res.json(value).end();
      } else {
        res.status(404).json({ status: 'Bad Request' }).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

// GET User by username
router.get('/:username', (req, res, next) => {
  User.find({ username: req.params.username })
    .then((value) => {
      if (value) {
        return res.json(value).end();
      } else {
        res.status(404).json({ status: 'Bad Request' }).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

// POST a new User
router.post('/', (req, res, next) => {
  const { username, name, password, links, description, image } = req.body;
  const newUser = new User({ username, name, password, links, description, image });
  newUser
    .save()
    .then((value) => {
      if (value) {
        return res.status(201).json({ status: 'User Saved' }).end();
      } else if (!value) {
        return res.status(204).json({ status: 'No content' }).end();
      } else {
        res.status(404).json({ status: 'Bad Request' }).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

// UPDATE a User by ID
router.put('/:id', (req, res, next) => {
  const { username, name, password, links, description, image } = req.body;

  const authorization = req.get('authorization');
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }
  const decodedToken = jwt.verify(token, 'jota');
  if (!token || !decodedToken) {
    return res.status(401).json({ status: 'missig or invalid token' }).end();
  }

  const newUser = { username, name, password, links, description, image };
  User.findByIdAndUpdate(req.params.id, newUser)
    .then((value) => {
      if (value) {
        return res.status(200).json({ status: 'User Updated' }).end();
      } else {
        res.status(404).json({ status: 'Bad Request' }).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

// DELETE a User by ID
router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then((value) => {
      if (value) {
        return res.json({ status: 'User Deleted' }).end();
      } else {
        res.status(404).json({ status: 'Bad Request' }).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

//Middleware
router.use((error, req, res, next) => {
  console.log(error);
  res.status(400).end();
});

module.exports = router;
