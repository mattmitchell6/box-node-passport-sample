/**
 * Controller to handle user login/logouts
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var authentication = require('connect-ensure-login');

var User = require('../models/users');

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/user/login' }), function(req, res) {
  res.redirect('/');
});

router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/signup', function(req, res) {
  User.register(
    new User({username: req.body.username, boxId: 'box id here'}), req.body.password, function(err, user) {
    if (err) {
      res.redirect('/user/signup');
    } else {
      passport.authenticate('local') (req, res, function() {
        res.redirect('/user/profile');
      });
    }
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/profile', authentication.ensureLoggedIn(), function(req, res) {
  res.render('profile', { user: req.user });
});

module.exports = router;
