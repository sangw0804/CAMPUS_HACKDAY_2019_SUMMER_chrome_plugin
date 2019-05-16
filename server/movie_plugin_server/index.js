const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const app = express();

// import Routes
const movieRoutes = require('./routes/movieRoutes');

// connect to db
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));


// Routes
app.use('/movies', movieRoutes);

// test Routes
app.get('/', async (req, res) => {
  try {
    res.send('hi');
  } catch (e) {
    console.log(e);
  }
})

// listening
app.listen(9000, () => {
  console.log('http listening to port : 9000');
});