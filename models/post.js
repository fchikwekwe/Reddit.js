const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const PostSchema = new Schema ({
    // createdAt: { type: Date },
    // updatedAt: { type: Date },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    subreddit: {
        type: String,
        required: true
    },
    comments: [
        Comment.schema
    ]
});

module.exports = mongoose.model('Post', PostSchema);
