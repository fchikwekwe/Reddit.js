const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {

    // Root
    app.get('/', (req, res) => {
        const currentUser = req.user;
        Post.find({})
            .populate('author')
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
            console.log(post)
            post.author = req.user._id;
            console.log("post.author.username" + post.author.username)
            post
                .save()
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
            // get post author
            .populate('author')
            // get comments author
            .populate({
                path: 'comments',
                populate: { path: 'author' }
            })
            .then((post) => {
                Comment.find()
                .then((comments) => {
                    res.render('posts-show', {
                        post: post,
                        comment: comments,
                        currentUser
                    });
                })
            })
        .catch(err => {
            console.log(err.message);
        });
    });

}
