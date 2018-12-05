const Post = require('../models/post');

module.exports = (app) => {

    // Root
    app.get('/', (req, res) => {
        const currentUser = req.user;
        Post.find({})
            .then(posts => {
            res.render('posts-index', { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
    })

    // NEW
    app.get('/posts/new', (req, res) => {
        const currentUser = req.user;
        res.render('posts-new', { currentUser });
    })

    // CREATE
    app.post('/posts', (req, res) => {
        // Only allow logged in users to create posts
        if (req.user) {
            const post = new Post(req.body);
            post.author = req.user._id;
            post.save
                .then(post => {
                    return User.findById(req.user._id);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save();
                // Redirect to the new post
                res.redirect('/posts/' + post._id);
            })
            .catch(err => {
                console.log(err.message);
            });
        } else {
            return res.status(401);
        }

    })

    // SHOW
    app.get('/posts/:id', function(req, res) {
        const currentUser = req.user;
        // Look up the post
        Post.findById(req.params.id)
        .populate('comments')
        .then((post) => {
            res.render('posts-show', { post, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
    });

}
