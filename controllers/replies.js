const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = (app) => {
    
    // NEW REPLY
    app.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
        const currentUser = req.user;
        let post;
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
    // CREATE REPLY
    app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
        // Lookup the parent post
        Post.findById(req.params.postId)
            .then(post => {
                // Find the child comment
                const comment = post.comments.id(req.params.commentId);
                // Add reply
                comment.replies.unshift(req.body);
                // Save the change to parent document
                return post.save();
            })
            .then(post => {
                //Redirect to the parent POST#SHOW route
                res.redirect('/posts/' + post._id);
            })
            .catch(err => {
                console.log(err.message);
            });
    });
};
