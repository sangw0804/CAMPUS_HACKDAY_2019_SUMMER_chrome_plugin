const express = require('express');
const axios = require('axios');

const config = require('../config');
const router = express.Router({ mergeParams: true });
const { User } = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const { user_id } = req.params;

    const foundUser = await User.findById(user_id);
    if (!foundUser) throw new Error('user not found!');

    res.status(200).send({movies: foundUser._likes});
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { movie_id } = req.body;

    const foundUser = await User.findById(user_id);
    if (!foundUser) throw new Error('user not found!');

    await foundUser.likes(movie_id);

    res.status(200).send({user: foundUser});
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.delete('/:movie_id', async (req, res) => {
  try {
    const { user_id, movie_id } = req.params;

    const foundUser = await User.findById(user_id);
    if (!foundUser) throw new Error('user not found!');

    await foundUser.dislikes(movie_id);

    res.status(200).send({user: foundUser});
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;