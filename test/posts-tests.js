const chai = require('chai');
const chaiHttp = require('../models/post');
const server = require('../app');
const Post = require('../models/post');

const should = chai.should()
chai.use(chaiHttp);

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

        console.log(post);
        Post.findOneAndRemove(post, () => {
            Post.find((err, posts) => {
                const postCount = posts.count;
                chai.request('localhost:3000')
                    .post('/posts/new')
                    .send(post)
                    .then((res) => {
                        Post.find(() => {
                            postCount.should.be.equal(posts.length + 1);
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
