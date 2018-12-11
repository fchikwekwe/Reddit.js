/** Require Mongoose */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/** Require Assert for Connection */
assert = require('assert');

/** Database Connection */
const url = 'mongodb://heroku_6jqp49f2:4ql0lgjrd2ijt3ri8mnj4dh4gd@ds131814.mlab.com:31814/heroku_6jqp49f2'
mongoose.connect(
    url || 'mongodb://localhost:27017/reddit',
    { useNewUrlParser: true },
    { useMongoClient: true },
    function(err, db) {
        assert.equal(null, err);
        console.log('Connected successfully to database');
        // db.close(); // turn on for testing
    }

);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
mongoose.set('debug', true);

module.exports = mongoose.connection;
