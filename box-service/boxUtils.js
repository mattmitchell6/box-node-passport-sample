/**
 *  Box utility methods
 */
var sdk = require('box-node-sdk');

var BoxSdk = require('./boxSdk');
var BoxConfig = require('config').boxAppSettings;

module.exports = {
  serviceAccountClient: function() {
    // Get the service account client, used to create and manage app user accounts
    var serviceAccountClient = BoxSdk.getAppAuthClient('enterprise', BoxConfig.enterpriseID);

    return serviceAccountClient;
  },
  userClient: function(appUserId) {
    return BoxSdk.getAppAuthClient('user', appUserId);
  }
}
