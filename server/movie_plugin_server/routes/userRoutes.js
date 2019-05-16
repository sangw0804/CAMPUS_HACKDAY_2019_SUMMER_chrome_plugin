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
      // 네이버에 토큰 전송해서 유저 정보 얻은 다음 디비에 새로운 유저 생성
      const header = "Bearer " + token; // Bearer 다음에 공백 추가
      const api_url = 'https://openapi.naver.com/v1/nid/me';
      const { data } = await axios(api_url, {
        headers: {'Authorization': header}
      });

      // data로 유저 생성
    }
    
    res.send({user: foundUser});
  } catch (e) {
    console.log(e);
  }
})