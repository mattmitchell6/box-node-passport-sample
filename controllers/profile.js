/**
 * Controller to display user profile
 */
var express = require('express');
var router = express.Router();

var BoxUtils = require('../box-service/boxUtils');

// fetch app user token and info
router.get('/', function(req, res) {
  BoxUtils.getAppUserToken(req.user.boxId)
    .then(token => {
      req.user.token = token;
      return BoxUtils.getUserInfo(req.user.boxId);
    })
    .then((appUser) => {
      res.render('profile', { user: req.user, appUser: appUser});
    })
    .catch(err => {
      console.log("Error:", err.message);
      res.render('profile', { user: req.user });
    });
});

router.post('/create-folder', function(req, res) {
  var folderName = req.body.folderName;
  var appUserClient = BoxUtils.appUserClient(req.user.boxId)

  appUserClient.folders.create('0', folderName)
    .then((folder) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err.response.body.status + ": " + err.response.body.code);
      res.redirect('/');
    });
});

module.exports = router;
