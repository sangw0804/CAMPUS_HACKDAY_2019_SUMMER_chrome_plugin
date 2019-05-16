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
  }
});

module.exports = router;