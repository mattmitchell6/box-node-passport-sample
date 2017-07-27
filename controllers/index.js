/**
 * Load all controllers
 */
var express = require('express');
var router = express.Router();

// load routes
router.use('/user', require('./user'));

router.get('/', function(req, res) {
  res.render('home', { user: req.user });
});

module.exports = router;
