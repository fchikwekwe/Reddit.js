const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
// Utility made by @dacioromero
const Autopopulate = require('../utilities/autopopulate.js')

const UserSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    password: {
        type: String,
        select: false
    },
    username: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    comments: [ {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}).pre('findOne', Autopopulate('comments'))
.pre('find', Autopopulate('comments'));

// Must use function here! ES6 => functions do not bind this!
UserSchema.pre('save', function(next) {
    // Set createdAt and updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }

    // Encrypt Password
    const user = this;
    if (!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

// Need to use function to enable this.password
UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
