/**
 * Load all controllers
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/');

const Auth0Config = require('config').get('Auth0Config');

// load routes
router.use('/profile', ensureLoggedIn, require('./profile'))

// base route
router.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/profile');
  } else {
    res.render('pages/home', {user: req.user});
  }
});

// login with auth0 identity service
router.get('/login',
  passport.authenticate('auth0', {
    clientID: Auth0Config.clientID,
    domain: Auth0Config.domain,
    redirectUri: Auth0Config.redirectUri,
    audience: 'https://' + Auth0Config.domain + '/userinfo',
    responseType: 'code',
    scope: 'openid profile'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// callback from auth0 auth
router.get('/callback', passport.authenticate('auth0', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/profile')
  }
);

// logout clear session
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
