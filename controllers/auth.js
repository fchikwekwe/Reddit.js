const jwt = require('jasonwebtoken');
const User = require('../models/user');

module.exports = function(app) => {
    // SIGN-UP FORM
    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
    });

    // SIGN-UP POST
    app.post('/sign-up', (req, res) => {
        // Create user
        const user = new User(req.body);

        user.save().then(user => {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/');
        }).catch(err => {
            console.log(err.message);
            return res.status(400).send({ err: err });
        });
    });

    // LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });

    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // Find this username
        User.findOne({ username } , 'username password')
            .then(user => {
                if (!user) {
                    // User not found
                    return res.status(401).send({ message: 'Wrong username or password' });
                }
                // Check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        //Password does not match
                        return res.status(401).send({ message: 'Wrong username or password' });
                    }
                    // Create a token
                    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                        expiresIn: '60 days'
                    });
                    // Set a cookie and redirect to root
                    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                    res.redirect('/');
                });
            }).catch(err => {
                console.log(err);
            });
    });
}
