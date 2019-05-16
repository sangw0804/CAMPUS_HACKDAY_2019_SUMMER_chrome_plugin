const express = require('express');
const axios = require('axios');

const config = require('../config');
const router = express.Router();
const { User } = require('../models/user');
const { findOptimalMovie } = require('./helpers');

router.post('/', async (req, res) => {
  try {
    const { q } = req.body;
    
    if (process.env.NODE_ENV === 'test') {
      // jest 테스트시 외부 api 호출이 cors 이슈 발생하여 임시로 이렇게 처리합니다.
      const data = {items: [
        { title: '<b>괴물</b>' },
        { title: 'monster' },
        { title: '호수 <b>괴물</b>' }
      ]};
    } else {
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
    }

    const movies = findOptimalMovie(data.items);

    console.log(movies);
    res.status(200).send(movies);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;