const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reddit', { useNewUrlParser: true });

const Post = mongoose.model('Post', {
    title: String,
    content: String
});

module.exports = Post;
