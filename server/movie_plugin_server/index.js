const express = require('express');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');
const app = express();

app.use(cors({ origin: true }));

app.post('/movies', async (req, res) => {
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
    res.send(data.items);
  } catch (e) {
    console.log(e);
  }
});

app.listen(9000, () => {
  console.log('http listening to port : 9000');
});