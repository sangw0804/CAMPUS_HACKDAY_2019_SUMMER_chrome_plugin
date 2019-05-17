const expect = require('expect');
const request = require('supertest');

const { app } = require('../app');
const { User } = require('../models/user');
const { users, populateUsers, client } = require('./seeds/userSeeds');

beforeEach(populateUsers);
afterAll(() => client.quit());

describe('User', () => {
  describe('POST /login', () => {
    it('should make new user with new token', done => {
      const data = {token: '111111'};

      request(app)
        .post(`/login`)
        .send(data)
        .expect(200)
        .expect(res => {
          expect(res.body.user._id).toBe(data.token);
        })
        .end(async (err, res) => {
          try {
            if (err) throw new Error(err);

            const foundUser = await User.findById(data.token);
            expect(foundUser._id).toBe(data.token);

            done();
          } catch (e) {
            done(e);
          }
        })
    });

    it('should return user with exist token', done => {
      const data = {token: users[0]._id};

      request(app)
        .post(`/login`)
        .send(data)
        .expect(200)
        .expect(res => {
          expect(res.body.user._id).toBe(data.token);
        })
        .end(async (err, res) => {
          try {
            if (err) throw new Error(err);

            const foundUser = await User.findById(data.token);
            expect(foundUser._id).toBe(data.token);

            done();
          } catch (e) {
            done(e);
          }
        })
    });
  });
});