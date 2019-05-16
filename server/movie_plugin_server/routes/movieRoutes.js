const express = require('express');
const axios = require('axios');

const config = require('../config');
const router = express.Router();
const { User } = require('../models/user');
const { findOptimalMovie, testApiData } = require('./helpers');

router.post('/', async (req, res) => {
  try {
    const { q, token } = req.body;
    
    let data;
    if (process.env.NODE_ENV === 'test') {
      // jest 테스트시 외부 api 호출이 cors 이슈 발생하여 임시로 이렇게 처리합니다.
      data = testApiData;
    } else {
      data = (await axios(
        `https://openapi.naver.com/v1/search/movie.json?query=${encodeURI(
          q
        )}`,
        {
          headers: {
            'X-Naver-Client-Id': config.NAVER_API.CLIENT_ID,
            'X-Naver-Client-Secret': config.NAVER_API.CLIENT_SECRET
          }
        }
      )).data;
    }

    const movies = findOptimalMovie(data.items);

    console.log(movies);
    const movie = {...movies[0], movie_id: movies[0].link.split('=')[1]};

    if (token) {
      const foundUser = await User.findById(token);
      await foundUser.addHistory(movie.movie_id);
    }

    res.status(200).send(movie);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;