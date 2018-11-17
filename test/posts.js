const Post = require("../models/post");

describe("Posts", () => {
    it("should create with valid attributes at POST /posts", done => {
        var post = {}
        Post.findOneAndRemove(post, function() {
            Post.find(function(err, posts) {
                var postCount = posts.count;

                chai
                    .request("localhost:3000")
                    .post("/posts")
                    .send(post)
                    .then(res => {
                        Post.find(function(err, posts) {
                            postCount.should.be.equal(posts.length - 1);
                            res.should.have.status(200);
                            return done();
                        });
                    })
                .catch(err => {
                    return done(err);
                });
            });
        });
    });
})
