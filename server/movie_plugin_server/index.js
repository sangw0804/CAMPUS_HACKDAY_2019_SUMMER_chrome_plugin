const express = require('express');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(cors({ origin: true }));

app.get('/movie_search', async (req, res) => {
  try {
    const { movie } = req.query;
    console.log(movie);
    const { data } = await axios(
      `https://openapi.naver.com/v1/search/movie.json?query=${encodeURI(
        movie
      )}`,
      {
        headers: {
          'X-Naver-Client-Id': config.NAVER_API.CLIENT_ID,
          'X-Naver-Client-Secret': config.NAVER_API.CLIENT_SECRET
        }
      }
    );

    console.log(data.items);
    res.send(JSON.stringify(data.items));
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => {
  console.log('http listening to port : 3000');
});

https
  .createServer(
    {
      ca: fs.readFileSync('/home/ubuntu/ssl/chain1.pem'),
      key: fs.readFileSync('/home/ubuntu/ssl/privkey1.pem'),
      cert: fs.readFileSync('/home/ubuntu/ssl/cert1.pem')
    },
    app
  )
  .listen(443, () => console.log(`https listening to port : 443`));
