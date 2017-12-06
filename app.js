const express = require('express');
const passport = require('passport');
const path = require('path');
const exphbs = require('express-handlebars')
const hbs = require('hbs')

const strategy = require('./identity-service/auth0Strategy.js')

// Create a new Express application.
var app = express();

// view engine setup (Handlebars)
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
	extname: '.hbs'
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

// load controllers & routes
app.use(require('./controllers'));

app.listen(3000);
