const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {
    /** CREATE */
    app.post('/posts/:postId/comments', (req, res) => {

    if (req.user) {
        /** Instantiate new comment with current user as author */
        const comment = new Comment(req.body)
        comment.author = req.user._id;

        comment
            .save()
            .then(comment => {
                return Post.findById(req.params.postId)
            })
            .then(post => {
                post.comments.unshift(comment)
                post.save()
                return res.redirect('/posts/' + post._id)
            })
            .catch(err => {
                console.log('Unable to create comment: ', err.message)
            })
        } else {
            return res.status(401);
        }
    })
}

/**
// Find the parent post
Post.findById(req.params.postId).exec(function(err, post) {
    // Unshift new comment
    post.comments.unshift(req.body);
    // Save parent
    post.save()
    // Redirect back to Parent Post SHOW
    return res.redirect('/posts/' + post._id);
});
});
*/
