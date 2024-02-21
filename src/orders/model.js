const Mongoose = require('mongoose');
const orderSchema = new Mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true
  },
  shipped: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
  },
  transactionDetails: {
    type: Object,
    required: true
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

module.exports = Mongoose.model('orders', orderSchema);
