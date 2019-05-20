const express = require('express');
const axios = require('axios');
const redis = require("redis");

const config = require('../config');
const router = express.Router();
const { User } = require('../models/user');
const { findOptimalMovie, testApiData, movieApiReq, trimMovie } = require('./helpers');
const client = require('./helpers/redisClient')();
const { promisify } = require('util');

const hmsetAsync = promisify(client.hmset).bind(client);
const getAsync = promisify(client.hgetall).bind(client);
const existAsync = promisify(client.exists).bind(client);

router.post('/', async (req, res) => {
  try {
    const { q, token } = req.body;
    
    let data;
    if (process.env.NODE_ENV === 'test') {
      // jest 테스트시 외부 api 호출이 cors 이슈 발생하여 임시로 이렇게 처리합니다.
      data = testApiData;
    } else {
      data = await movieApiReq(q);
    }

    const movies = findOptimalMovie(data.items);
    const movie = {...movies[0], movie_id: movies[0].link.split('=')[1]};

    if (token) {
      const foundUser = await User.findById(token);
      if (!foundUser) throw new Error('해당 token에 맞는 유저가 존재하지 않습니다!');

      await foundUser.addHistory(movie.movie_id);
      console.log(movie.movie_id);
      if (!await existAsync(movie.movie_id)) {
        await hmsetAsync(movie.movie_id, movie);
      }
    }

    res.status(200).send(movie);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;