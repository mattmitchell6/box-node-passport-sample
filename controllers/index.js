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
  res.render('home', { user: req.user });
});

module.exports = router;
