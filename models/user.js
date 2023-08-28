const mongoose = require('mongoose');

const UserSchema= mongoose.Schema({
    id:Number,
    name: String,
    count: Number
})
 exports.User= mongoose.model('User',UserSchema);