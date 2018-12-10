const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {

    /** CREATE */
    app.post('/posts/:postId/comments', (req, res) => {
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


}
