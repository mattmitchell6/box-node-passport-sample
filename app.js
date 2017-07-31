var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');

var strategy = require('./identity-service/passportStrategy.js');
var MongooseConfig = require('config').MongooseConfig;

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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

app.listen(3000);
