/**
 * Load all controllers
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/');

const Auth0Config = require('config').auth0Config;

// load routes
router.use('/profile', ensureLoggedIn, require('./profile'))

/**
 * base route
 */
router.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/profile');
  } else {
    res.render('pages/home', {
      auth0Config: Auth0Config
    });
  }
});

/**
 * callback from auth0
 */
router.get('/callback', passport.authenticate('auth0', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/profile')
  }
);

/**
 * logout clear session
 */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
