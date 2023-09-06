const mongoose = require('mongoose');

const orderSchema= mongoose.Schema({
    name: String,
    countInStock: Number,
 })
 exports.Order= mongoose.model('Order', orderSchema);