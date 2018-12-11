const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Utility made by @dacioromero
const Autopopulate = require('../utilities/autopopulate.js')

const CommentSchema = new Schema ({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}).pre('findOne', Autopopulate('comments'))
.pre('find', Autopopulate('comments'));

module.exports = mongoose.model('Comment', CommentSchema)
