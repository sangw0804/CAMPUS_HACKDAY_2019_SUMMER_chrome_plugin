const { User } = require('../../models/user');
const { ObjectID } = require('mongodb');

// User
const users = [
  {
    _id: '123456',
    _likes: ['20482'],
    _histories: [{
      _id: new ObjectID(),
      movie_id: '99999',
      created_at: new Date().getTime()
    }]
  }
];

const populateUsers = async done => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    done();
  } catch (e) {
    done(e);
  }
};

module.exports = { users, populateUsers };
