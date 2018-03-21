/**
 * Controller to display user dashboard
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const BoxSdk = require('../service/box/boxSdk');

/**
 * Fetch app user token + info
 */
router.get('/', async function (req, res) {
  let boxUserId = req.user.boxId
  let appUserClient = BoxSdk.getAppAuthClient('user', boxUserId);

  // get app user access token and user info
  let tokens = await BoxSdk.getAppUserTokens(req.user.boxId);
  let appUserInfo = await appUserClient.users.get(boxUserId, {fields: "name,login,created_at"});
  req.user.boxAccessToken = tokens.accessToken

  res.render('pages/profile', { user: req.user, appUser: appUserInfo});
});

/**
 * Post to create a new Box folder
 */
router.post('/create-folder', async function (req, res) {
  let folderName = req.body.folderName;
  let appUserClient = BoxSdk.getAppAuthClient('user', req.user.boxId);

  // create folder
  try {
    await appUserClient.folders.create('0', folderName)
  } catch(err) {
    console.log(err);
  }

  res.redirect('/');
});

/**
 * Post to upload file
 */
router.post('/upload', upload.single('file'), async function (req, res) {
  let appUserClient = BoxSdk.getAppAuthClient('user', req.user.boxId);
  let fileStream = fs.createReadStream(req.file.path);

  // upload file, catch upload error (mainly for duplicate files)
  try {
    await appUserClient.files.uploadFile('0', req.file.originalname, fileStream)
  } catch(err) {
    console.log(err);
  }

	// Once the upload completes, delete the temporary file from disk
  fs.unlink(req.file.path, function() {});

  res.redirect('/');
});

module.exports = router;
