const express = require('express');

const router = express.Router();
const { User } = require('../models/user');

router.post('/login', async (req, res) => {
  try {
    const { token } = req.body;

    let foundUser = await User.findById(token);
    if (!foundUser) {
      foundUser = await User.signUp(token);
    }

    res.status(200).send({user: foundUser});
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
})

module.exports = router;