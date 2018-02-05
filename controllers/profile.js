/**
 * Controller to display user profile
 */
const express = require('express');
const router = express.Router();

const BoxUtils = require('../service/box/boxUtils');

// Fetch app user token + info and display
router.get('/', async function (req, res) {
  let token = await BoxUtils.getAppUserToken(req.user.boxId)
  let appUserInfo = await BoxUtils.getUserInfo(req.user.boxId)

  req.user.boxAccessToken = token
  res.render('pages/profile', { user: req.user, appUser: appUserInfo});
});

// Post to create a new Box folder
router.post('/create-folder', async function (req, res) {
  let folderName = req.body.folderName;
  let appUserClient = BoxUtils.appUserClient(req.user.boxId)

  await appUserClient.folders.create('0', folderName)
  res.redirect('/');
});

module.exports = router;
