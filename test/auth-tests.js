const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const User = require('../models/user');

describe('User', () => {
    it('should not be able to login if they have not registered', (done) => {
        agent.post('/login', {
            email: 'wrong@wrong.com',
            password: 'nope',
        }).end((err, res) => {
            res.status.should.be.equal(401);
            done();
        });
    });

    it('should be able to signup', (done) => {
        User.findOneAndRemove({ username: 'testone' }, () => {
            agent.post('/sign-up')
            .send({
                username: 'testone',
                password: 'password'
            })
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                expect(agent).to.have.cookie('nToken');
                done();
            });
        });
    });

    it('should be able to login', (done) => {
        agent.post('/login')
        .send({
            username: 'testone',
            password: 'password'
        })
        .end(function(err, res) {
            expect(agent).to.have.status(200);
            res.should.have.cookie('nToken');
            done();
        });
    });

    it('should be able to logout', (done) => {
        agent.get('/logout').end(function(err, res) {
            res.should.have.status(200);
            res.should.not.have.cookie('nToken');
            done();
        });
    });
});
