/**
 * Controller to display user profile
 */
var express = require('express');
var router = express.Router();
var {props, coroutine} = require('bluebird');

var BoxUtils = require('../box-service/boxUtils');

// fetch app user token and info
router.get('/', coroutine(function* (req, res) {
  try {
    var {token, appUserInfo} = yield props({
      token: BoxUtils.getAppUserToken(req.user.boxId),
      appUserInfo: BoxUtils.getUserInfo(req.user.boxId)
    });
    req.user.token = token

    res.render('profile', { user: req.user, appUser: appUserInfo});
  } catch(err) {
    console.log("Error - " + err.response.body.status + ": " + err.response.body.code);
    res.render('profile', { user: req.user, appUser: undefined });
  }
}));

router.post('/create-folder', coroutine(function* (req, res) {
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
