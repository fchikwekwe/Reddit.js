const Post = require('../models/post');

module.exports = (app) => {
    // SUBREDDIT
    app.get('/f/:subreddit', function(req, res) {
        const currentUser = req.user;
        Post.find({
            subreddit: req.params.subreddit
        })
            .then(posts => {
                res.render ('posts-index', { posts, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    });
}
