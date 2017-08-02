/**
 * Controller to display user profile
 */
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var async = Promise.coroutine;

var BoxUtils = require('../box-service/boxUtils');

// fetch app user token and info
router.get('/', async(function* (req, res) {
  var appUserInfo;

  try {
    req.user.token = yield BoxUtils.getAppUserToken(req.user.boxId)
    appUserInfo = yield BoxUtils.getUserInfo(req.user.boxId);
    res.render('profile', { user: req.user, appUser: appUserInfo});
  } catch(err) {
    console.log("Error - " + err.response.body.status + ": " + err.response.body.code);
    res.render('profile', { user: req.user, appUser: undefined });
  }
}));

router.post('/create-folder', async(function* (req, res) {
  var folderName = req.body.folderName;
  var appUserClient = BoxUtils.appUserClient(req.user.boxId)

  try {
    yield appUserClient.folders.create('0', folderName)
  } catch(err) {
    console.log("Error - " + err.response.body.status + ": " + err.response.body.code);
  }

  res.redirect('/');
}));

module.exports = router;
