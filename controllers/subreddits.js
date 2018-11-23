const Post = require('../models/post');

module.exports = function(app) {
    // SUBREDDIT
    app.get('/f/:subreddit', function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
            .then(posts => {
                res.render ('posts-index', { posts });
            }).catch(err => {
                console.log(err);
            });
    });
}
