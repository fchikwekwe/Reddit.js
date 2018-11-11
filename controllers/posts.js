const Post = require('../models/post');

module.exports = function (app) {

    // Root
    app.get('/', (req, res) => {
        Post.find({})
        .then(posts => {
            res.render("posts-index", { posts });
        })
        .catch(err => {
            console.log(err.message);
        });
    })
    // NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    })

    // CREATE
    app.post('/posts', (req, res) => {
        // console.log(req.body);
        // Instantiate instance of post model
        const post = new Post(req.body);
        // Save instance of post model to DB
        post.save((err, post) => {
            // Redirect to the root
            return res.redirect(`/`);
        })
    })
    // SHOW
    app.get("/posts/:id", function(req, res) {
        // Look up the post
        Post.findById(req.params.id)
        .then(post => {
            res.render("posts-show", { post });
        })
        .catch(err => {
            console.log(err.message);
        });
    });
}
