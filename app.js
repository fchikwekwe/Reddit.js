const express = require('express');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

const app = express();

const Post = require('./models/post');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit', { useNewUrlParser: true });

app.set('port', process.env.PORT || 3000);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(express.static('public'));

require('./data/reddit-db');
require('./controllers/posts.js')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
})
