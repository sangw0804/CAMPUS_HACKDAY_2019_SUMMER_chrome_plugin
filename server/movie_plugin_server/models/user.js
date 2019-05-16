const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      // token
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

userSchema.statics.signUp = async function (token) {
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