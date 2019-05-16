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
        movie_id: {
          type: String,
          required: true
        },
        created_at: {
          type: Number,
          required: true
        }
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

userSchema.methods.addHistory = async function (movie_id) {
  const user = this;

  user._histories.push({movie_id, created_at: new Date().getTime()});
  await user.save();
}

const User = mongoose.model('User', userSchema);

module.exports = { User };