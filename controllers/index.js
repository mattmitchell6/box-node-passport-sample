/**
 * Load all controllers
 */
var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/user/login');

// load routes
router.use('/profile', ensureLoggedIn, require('./profile'))
router.use('/user', require('./user'));

router.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/profile');
  } else {
    res.render('home', {user: req.user});
  }
});

module.exports = router;
