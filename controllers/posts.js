const Post = require('../models/post');

module.exports = function (app) {

    // NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    })

    // CREATE
    app.post('/posts', (req, res) => {
        // console.log(req.body);
        Post.create(req.body).then((post) => {
            console.log(post);
            res.redirect('/')
        }).catch((err) => {
            console.log(err.message);
        })
    })
}
