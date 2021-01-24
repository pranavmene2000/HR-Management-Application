const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    //
    typeOfleave: {
        type: String,
        enum: ['Sick', 'Casual', 'Maternity', 'Religious']
    },
    reason: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    //
    status: {
        type: String,
        enum: ['approved', 'rejected', 'pending'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Admin', adminSchema);