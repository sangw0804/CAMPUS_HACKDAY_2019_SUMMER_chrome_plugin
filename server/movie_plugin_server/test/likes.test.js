const expect = require('expect');
const request = require('supertest');

const { app } = require('../app');
const { User } = require('../models/user');
const { users, populateUsers } = require('./seeds/userSeeds');

beforeEach(populateUsers);

describe('Like', () => {
  describe('GET /users/:user_id/likes', () => {
    it('should return likes of specific user', done => {
      request(app)
        .get(`/users/${users[0]._id}/likes`)
        .expect(200)
        .expect(res => {
          expect(res.body.movies[0]).toBe(users[0]._likes[0]);
        })
        .end(done);
    });
  });

  describe('POST /users/:user_id/likes/:movie_id', () => {
    const data =  {movie_id: '34524'};

    it('should save likes to specific user', done => {
      request(app)
        .post(`/users/${users[0]._id}/likes`)
        .send(data)
        .expect(200)
        .end(async (err, res) => {
          try {
            if (err) throw new Error(err);

            const foundUser = await User.findById(users[0]._id);
            expect(foundUser._likes[1]).toBe(data.movie_id);

            done();
          } catch (e) {
            done(e);
          }
        });
    });
  });
});