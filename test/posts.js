const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
const Post = require("../models/post");

describe('Posts', () => {
    it('should create with valid attributes at POST /posts', done => {
        var post = { title: 'post title', url: 'https://www.google.com', summary: 'post summary' };
        console.log(post);
        Post.findOneAndRemove(post, function() {
            Post.find(function(err, posts) {
                var postCount = posts.count;
                chai
                    .request('localhost:3000')
                    .post('/posts/new')
                    .send(post)
                    .then(res => {
                        Post.find(function(err, posts) {
                            postCount.should.be.equal(posts.length + 1);
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

module.exports = server;
