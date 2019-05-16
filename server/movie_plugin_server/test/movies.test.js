const expect = require('expect');
const request = require('supertest');

const { app } = require('../app');
const { User } = require('../models/user');
const { users, populateUsers } = require('./seeds/userSeeds');

beforeEach(populateUsers);

describe('Movie', () => {
  describe('post /movies', () => {
    it('should return movie data with valid q', done => {
      const body = {q: '괴물'};

      request(app)
        .post(`/movies`)
        .send(body)
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveProperty('title');
        })
        .end(done);
    });

    it('should return movie data and add to history of user', done => {
      const body = {q: '괴물', token: users[0]._id}

      request(app)
        .post('/movies')
        .send(body)
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveProperty('title');
        })
        .end(async (err, res) => {
          try {
            if (err) throw new Error(err);

            const foundUser = await User.findById(body.token);
            expect(foundUser._histories[0].movie_id).toBe(res.body.movie_id);

            done();
          } catch (e) {
            done(e);
          }
        })
    });
  });
});