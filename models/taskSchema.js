const mongoose = require('mongoose');
const story = require('./story');
const { Schema } = mongoose;

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: story,
        required: true
    },
    start: {
        type: Date,
        default: Date.now(),
        required: false
    },
    end: {
        type: Date,
        required: false
    },
    status: {
        type: String, 
        required: false,
        enum: ['pending', 'done', 'in-progress']
    },
    isCompleted: {
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model('tasks', taskSchema);