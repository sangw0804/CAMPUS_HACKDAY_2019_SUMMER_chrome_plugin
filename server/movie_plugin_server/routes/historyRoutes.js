const express = require('express');
const axios = require('axios');

const config = require('../config');
const router = express.Router({ mergeParams: true });
const { User } = require('../models/user');
const { movieApiReq } = require('./helpers');
const client = require('./helpers/redisClient')();
const { promisify } = require('util');

const hgetallAsync = promisify(client.hgetall).bind(client);

router.get('/', async (req, res) => {
  try {
    const { user_id } = req.params;

    const foundUser = await User.findById(user_id);
    if (!foundUser) throw new Error('user not found!');

    const promises = foundUser._histories.map(async h => {
      let tempHistory = await hgetallAsync(h.movie_id);
      return {...tempHistory, created_at: h.created_at};
    });
    const histories = await Promise.all(promises);

    res.status(200).send({histories});
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

    await foundUser.removeHistory(movie_id);

    res.status(200).send({user: foundUser});
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;