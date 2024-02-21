const Mongoose = require('mongoose');
const categorySchema = new Mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('category', categorySchema);
