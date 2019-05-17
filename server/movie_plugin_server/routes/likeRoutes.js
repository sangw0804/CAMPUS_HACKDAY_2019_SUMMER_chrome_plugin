const express = require('express');
const axios = require('axios');
const redis = require("redis");

const config = require('../config');
const router = express.Router({ mergeParams: true });
const { User } = require('../models/user');
const client = require('./helpers/redisClient')();
const { promisify } = require('util');

const hgetallAsync = promisify(client.hgetall).bind(client);

router.get('/', async (req, res) => {
  try {
    const { user_id } = req.params;

    const foundUser = await User.findById(user_id);
    if (!foundUser) throw new Error('user not found!');

    const promises = foundUser._likes.map(l => hgetallAsync(l));
    const movies = await Promise.all(promises);

    res.status(200).send({ movies });
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