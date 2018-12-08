/*
* Reddit Clone Main Server
*/
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const exphbs = require('express-handlebars');

/** Authentication */
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 3000;

/** Database Connection */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit', { useNewUrlParser: true });

/** Use Middleware */
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

/** Custom Middleware */
const checkAuth = (req, res, next) => {
    // console.log('Checking authentication');
    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
        req.user = null;
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, {
            complete: true
        }) || {};
        req.user = decodedToken.payload;
    }
    next();
};
app.use(checkAuth);

/** Require Controllers */
require('./data/reddit-db');
require('./controllers/auth.js')(app);
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);

app.listen(PORT, () => {
    console.log('App listening on port', PORT)
});

module.exports = app;
