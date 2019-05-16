const { User } = require('../../models/user');

// User
const users = [
  {
    _id: '123456',
    _likes: [],
    _histories: []
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
