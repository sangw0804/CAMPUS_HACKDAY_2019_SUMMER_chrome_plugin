const express = require('express');
const axios = require('axios');

const config = require('../config');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { q } = req.body;
    console.log(q);
    const { data } = await axios(
      `https://openapi.naver.com/v1/search/movie.json?query=${encodeURI(
        q
      )}`,
      {
        headers: {
          'X-Naver-Client-Id': config.NAVER_API.CLIENT_ID,
          'X-Naver-Client-Secret': config.NAVER_API.CLIENT_SECRET
        }
      }
    );

    console.log(data.items);
    res.status(200).send(data.items);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;