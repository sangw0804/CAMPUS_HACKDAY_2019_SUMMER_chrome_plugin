const expect = require('expect');
const request = require('supertest');

const { app } = require('../app');
const { User } = require('../models/user');
const { users, populateUsers } = require('./seeds/userSeeds');

beforeEach(populateUsers);

describe('History', () => {
  describe('GET /users/:user_id/histories', () => {
    it('should return histories of specific user', done => {
      request(app)
        .get(`/users/${users[0]._id}/histories`)
        .expect(200)
        .expect(res => {
          expect(res.body.histories[0].movie_id).toBe(users[0]._histories[0].movie_id);
        })
        .end(done);
    });
  });

  describe('DELETE /users/:user_id/histories/:movie_id', () => {
    it('should delete like from specific user', done => {
      request(app)
        .delete(`/users/${users[0]._id}/histories/${users[0]._histories[0].movie_id}`)
        .expect(200)
        .end(async (err, res) => {
          try {
            if (err) throw new Error(err);

            const foundUser = await User.findById(users[0]._id);
            expect(foundUser._histories.length).toBe(0);

            done();
          } catch (e) {
            done(e);
          }
        });
    });
  });
});