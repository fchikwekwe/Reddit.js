const Post = require('../models/post');

module.exports = (app) => {

    // SUBREDDIT
    app.get('/f/:subreddit', function(req, res) {
        // console.log("subreddit: " + req.params.subreddit)
        const currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit })
            .populate('author')
            .then(posts => {
                res.render ('posts-index', {
                    posts: posts,
                    currentUser });
            })
            .catch(err => {
                console.log("Unable to get subreddit: ", err);
            });
    });
}
