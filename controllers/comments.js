const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = function comments(app) {
    // CREATE COMMENT
    app.post('/posts/:postId/comments', (req, res) => {
    //     //Instantiate instance of comment model
        const comment = new Comment(req.body);
        console.log(req.body)
        comment.author = req.body.author;
    //     // Save instance of comment model to DB
        comment.save().then((comment) => {
                return Post.findById(req.params.postId);
            }).then((post) => {
                post.comments.unshift(comment);
                return post.save();
            }).then(() => {
                // Redirect to the root
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
            });
    })
}
