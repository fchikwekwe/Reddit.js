const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = (app) => {
    // CREATE REPLY
    app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
        const comment = new Comment(req.body);
        comment.author = req.user._id

        comment
            .save()
            .then(() => {
                // Find and return parent comment
                return Comment.findById(req.params.commentId)
            })
            .then(parent => {
                console.log('UNSHIFTING PARENT!!')
                // Add reply
                parent.comments.unshift(comment);
                // Save the change to parent document
                parent.save();
            })
            .then(() => {
                // Get the current user
                return User.findById(req.user._id);
            })
            .then((user) => {
                console.log('UNSHIFTING USER COMMENTS!')
                user.comments.unshift(comment);
                user.save()
            })
            .then(() => {
                res.redirect('/posts/' + req.params.postId);
            })
            .catch(err => {
                console.log(err.message);
            });
    });
};

/*
*
// NEW REPLY
app.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
    const currentUser = req.user;
    Post.findById(req.params.postId)
        .then(p => {
            post = p;
            return Comment.findById(req.params.commentId);
        })
        .then(comment => {
            res.render('replies-new', {
                post,
                comment,
                currentUser
            });
        })
        .catch(err => {
            console.log(err.message);
        });
});

*/
