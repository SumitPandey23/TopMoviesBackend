const mongoose = require('mongoose');

const UserType = {
  ADMIN: 'Admin',
  USER: 'User'
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: [UserType.ADMIN, UserType.USER],
    default: UserType.USER, 
  },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;