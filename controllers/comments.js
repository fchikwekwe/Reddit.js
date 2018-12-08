const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {

    /** CREATE */
    app.post('/posts/:postId/comments', (req, res) => {
        // Find the parent post
        Post.findById(req.params.postId).exec(function(err, post) {
            // Unshift new comment
            post.comments.unshift(req.body);
            // Save parent
            post.save()
            // Redirect back to Parent Post SHOW
            return res.redirect('/posts/' + post._id);
        });
    });


}

/**
// OLD CREATE ROUTE
//     app.post('/posts/:postId/comments', (req, res) => {
//     // Check currentUser
//     const currentUser = req.user;
//     if (req.user) {
//         // CREATE COMMENT
//         const comment = new Comment(req.body);
//         console.log("req.body: " + req.body);
//         comment.author = req.user._id;
//         // Save instance of comment model to DB
//         comment
//             .save()
//             .then((comment) => {
//                 return Post.findById(req.user._id);
//             })
//             .then((post) => {
//                 post.comments.unshift(comment);
//                 post.save();
//                 res.redirect('/posts/' + post._id);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//         } else {
//             return res.status(401);
//         }
//     });
 */
