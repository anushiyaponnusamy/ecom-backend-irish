
const Mongoose = require('mongoose');
const productSchema = new Mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  photo: {
    type: String,

  },
  categoryId: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  shipping: {
    type: String,
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

module.exports = Mongoose.model('product', productSchema);
