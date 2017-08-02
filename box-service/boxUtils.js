/**
 *  Box utility methods
 */
var sdk = require('box-node-sdk');
var {coroutine} = require('bluebird');

var BoxSdk = require('./boxSdk');
var BoxConfig = require('config').boxAppSettings;

module.exports = {
  // Get the service account client, used to create and manage app user accounts
  serviceAccountClient: function() {
    var serviceAccountClient = BoxSdk.getAppAuthClient('enterprise', BoxConfig.enterpriseID);

    return serviceAccountClient;
  },
  // get app user client
  appUserClient: function(appUserId) {
    return BoxSdk.getAppAuthClient('user', appUserId);
  },
  // create new app user
  newAppUser: coroutine(function* (username) {
    var serviceAccountClient = this.serviceAccountClient();

    var appUser = yield serviceAccountClient.enterprise.addAppUser(username, null);
    return appUser.id
  }),
  // get app user access token
  getAppUserToken: function(appUserId) {
    return new Promise((resolve, reject) => {
      BoxSdk.getAppUserTokens(appUserId, function(err, tokens) {
        if (err) {
          reject(err);
        } else {
          resolve(tokens.accessToken);
        }
      });
    });
  },
  // get current app user info
  getUserInfo: coroutine(function* (appUserId) {
    var client = this.appUserClient(appUserId);
    return yield client.users.get(client.CURRENT_USER_ID);
  })
}
