/**
 * Controller to handle user login/logouts
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var authentication = require('connect-ensure-login');
var {coroutine} = require('bluebird');

var User = require('../models/users');

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/user/login' }), function(req, res) {
  res.redirect('/');
});

router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/signup', coroutine(function* (req, res) {
  var userInfo = req.body;

  try {
    // create new app user and db user
    yield User.newUser(userInfo);
    console.log("Successfully created new user");
    passport.authenticate('local') (req, res, function() {
      res.redirect('/profile');
    });
  } catch(err) {
    console.log("Error could not create user - ", err.message);
    res.render('signup', {error: err.message});
  }
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
