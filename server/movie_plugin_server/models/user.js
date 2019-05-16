const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      // firebase auth 에서 사용하는 uid
      type: String,
      required: true
    },
    _histories: [
      {
        type: String
      }
    ],
    _likes: [
      {
        type: String
      }
    ]
  }, {
    _id: false
  }
);

User.statics.signUp = async function (token) {
  try {
    const User = this;

    return User.create({
      _id: token
    });
  } catch (e) {
    throw new Error(e);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = { User };