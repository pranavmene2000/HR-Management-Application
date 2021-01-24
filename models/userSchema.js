const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    original_password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['Admin', 'Employee'],
        default: 'Admin'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Users', userSchema);