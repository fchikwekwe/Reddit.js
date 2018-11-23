const Post = require('../models/post');

module.exports = function(app) {
    // UP VOTES
    app.put('/posts/:id/vote-up', function(req, res) {
        Post.findById(req.params.id)
        .exec(function(err, post) {
            post.upVotes.push(req.user._id);
            post.voteScore = post.voteTotal + 1;
            post.save();

            res.status(200);
        });
    });

    //DOWN VOTES
    app.put('/posts/:id/vote-down', function(req, res) {
        Post.findById(req.params.id)
        .exec(function(req, res) {
            post.downVotes/push(req.user._id);
            post.voteScore = post.voteTotal - 1;
            post.save();

            res.status(200);
        });
    });
}
