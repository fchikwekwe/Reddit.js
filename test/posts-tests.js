/** Require testing frameworks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should()
chai.use(chaiHttp);

/** Require model and main server */
const server = require('../app');
const Post = require('../models/post');

/** Using an agent to preserve JWT */
const agent = chai.request.agent(server);

/** Dummy post to use in our tests */
const post = {
    'title': 'post title',
    'url': 'https://www.google.com',
    'summary': 'post summary'
};


describe('Posts', () => {

    before((done) => {
        agent.post('/login')
        .send({ username: 'testone', password: 'password' })
        .end((err, res) => {
            done();
        });
    });

    after(() => {
        Post.deleteMany({
            title: 'post title'
        }).exec((err, posts) => {
            posts.remove();
        })
    });
    it('should create with valid attributes at POST /posts', (done) => {
        

        // console.log(post);
        Post.findOneAndRemove(post, () => {
            Post.find((err, posts) => {
                const postCount = posts.length;
                chai.request('localhost:3000')
                    .post('/posts')
                    .send(post)
                    .then((res) => {
                        Post.find(() => {
                            postCount.should.be.equal(posts.length - 1);
                            res.should.have.status(200);
                            return done();
                        });
                    })
                .catch(() => {
                    return done(err);
                });
            });
        });
    });
});

module.exports = server;
