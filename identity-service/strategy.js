var Strategy = require('passport-local').Strategy;
var passport = require('passport');

var User = require('../models/users');

// Configure the local strategy for use by Passport.
passport.use(new Strategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
