require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    console.log('Checking authentication');
    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
        req.user = null;
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit', { useNewUrlParser: true });

const Post = require('./models/post');

app.set('port', process.env.PORT || 3000);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(checkAuth);

require('./data/reddit-db');
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
});

module.exports = app;
