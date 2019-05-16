const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const app = express();

// import Routes
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

// connect to db
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/movies', movieRoutes);
app.use('/', userRoutes);

// test Routes
app.get('/', async (req, res) => {
  try {
    res.send('hi');
  } catch (e) {
    console.log(e);
  }
})

module.exports = { app };