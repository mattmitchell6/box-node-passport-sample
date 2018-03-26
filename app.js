const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars')
const hbs = require('hbs')
const handlebarsHelpers = require('./helpers/handlebars');
require('express-async-errors');

const strategy = require('./service/passport-local/passportStrategy.js');
const MongooseConfig = require('config').mongooseConfig;

// Create a new Express application.
var app = express();

// view engine setup (Handlebars)
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
	extname: '.hbs',
	helpers: handlebarsHelpers
}));
app.set('views', path.join(__dirname, 'views'));

// register handlebars partials
hbs.registerPartials(__dirname + '/views/partials');

// Use application-level middleware for common functionality, including parsing, and session handling.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// mongoose connect
mongoose.connect(MongooseConfig.databaseUrl);

// load controllers & routes
app.use(require('./controllers'));

// error handling
app.use((err, req, res, next) => {
	console.log(err);
	res.render('pages/error', { error: err});
});

app.listen(3000);
