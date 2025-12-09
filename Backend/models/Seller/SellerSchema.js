const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
