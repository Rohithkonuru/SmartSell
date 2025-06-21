const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  emoji: { type: String, default: '📦' }
});

module.exports = mongoose.model('Product', ProductSchema);
