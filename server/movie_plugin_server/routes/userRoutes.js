const express = require('express');

const axios = require('axios');
const config = require('../config');
const router = express.Router();
const { User } = require('../models/user');

router.post('/login', async (req, res) => {
  try {
    const { token } = req.body;

    const foundUser = await User.findById(token);
    if (!foundUser) {
      foundUser = await User.signUp();
    }

    res.send({user: foundUser});
  } catch (e) {
    console.log(e);
  }
})