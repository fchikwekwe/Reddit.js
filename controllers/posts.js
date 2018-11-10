const Post = require('../models/post');

module.exports = function (app) {

    // Root
    app.get('/', (req, res) => {
        res.send('Hello, world!')
    })
    // NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    })

    // CREATE
    app.post('/posts', (req, res) => {
        // console.log(req.body);
        // Post.create(req.body).then((post) => {
        //     console.log(post);
        //     res.redirect('/')
        // }).catch((err) => {
        //     console.log(err.message);
        // })
        // Instantiate instance of post model
        const post = new Post(req.body);
        // Save instance of post model to DB
        post.save((err, post) => {
            // Redirect to the root
            return res.redirect(`/`);
        })
    })
}
