const mongoose = require('mongoose')

const Commitlog = new mongoose.Schema({
    student_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    Session: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Commitlog', Commitlog)