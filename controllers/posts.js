const Post = require('../models/post');

module.exports = function (app) {

    // Root
    app.get('/', (req, res) => {
        const currentUser = req.user;

        Post.find({}).then(posts => {
            res.render('posts-index', { posts });
        }).catch(err => {
            console.log(err.message);
        });
    })

    // NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    })

    // CREATE
    app.post('/posts', (req, res) => {
        // Only allow logged in users to create posts
        if (req.user) {
            const post = new Post(req.body);
            post.save((err, post) => {
                return res.redirect(`/`);
            });
        } else {
            return res.status(401);
        }

    })

    // SHOW
    app.get('/posts/:id', function(req, res) {
        // Look up the post
        Post.findById(req.params.id)
        .populate('comments')
        .then((post) => {
            res.render('posts-show', { post });
        }).catch(err => {
            console.log(err.message);
        });
    });

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
