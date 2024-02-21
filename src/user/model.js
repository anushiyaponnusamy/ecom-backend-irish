const Mongoose = require('mongoose');
const { Roles } = require('../../enum');
const userSchema = new Mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: 'general'
  },
  role: {
    type: String,
    default: Roles[1]
  },
  //reser pass word question
  question: {
    type: String,
    required: true
  },
  // soft delete
  active: {
    type: Boolean,
    default: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
  profilePhoto: {
    type: String
  },

  address: {
  },

});

module.exports = Mongoose.model('user', userSchema);
