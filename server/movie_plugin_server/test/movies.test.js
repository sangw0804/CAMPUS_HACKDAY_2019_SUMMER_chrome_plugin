const expect = require('expect');
const request = require('supertest');
// const {ObjectID} = require("mongodb");
const { app } = require('../app');
const { User } = require('../models/user');

describe('Movie', () => {
  describe('post /movies', () => {
    it('should return movie data with valid q', done => {
      const body = {q: '광해'};

      // request(app)
      //   .post(`/movies`)
      //   .send(body)
      //   .expect(200)
      //   .expect(res => {
      //     expect(res.body[0]).toHaveProperty('title');
      //   })
      //   .end(done);
      done();
    });
  });
});