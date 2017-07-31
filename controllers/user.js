/**
 * Controller to handle user login/logouts
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var authentication = require('connect-ensure-login');

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

router.post('/signup', function(req, res) {
  var userInfo = req.body;

  // create new app user and db user
  User.newUser(userInfo)
    .then((user) => {
      console.log("Successfully created new user");
      passport.authenticate('local') (req, res, function() {
        res.redirect('/profile');
      });
    })
    .catch((error) => {
      console.log("Error could not create user - ", error.message);
      res.render('signup', {error: error.message});
    });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
