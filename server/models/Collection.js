const mongoose = require('mongoose')

const Collection = new mongoose.Schema({
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
    session: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Collection', Collection)