const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    _id: { type: Number, required: true },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: { type: String, required: true},
    gender: { type: String, required: true},
    avatar: { type: String, required: true},
    color: { type: String, required: true},
    job: { type: String, required: true},
}, { collection: 'Users', strict: false });


const User = model('User', userSchema);

module.exports = User;
