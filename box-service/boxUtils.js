/**
 *  Box utility methods
 */
const sdk = require('box-node-sdk');

const BoxSdk = require('./boxSdk');
const BoxConfig = require('config').boxAppSettings;

module.exports = class BoxUtils {

  // Get the service account client, used to create and manage app user accounts
  static serviceAccountClient() {
    let serviceAccountClient = BoxSdk.getAppAuthClient('enterprise', BoxConfig.enterpriseID);
    return serviceAccountClient;
  }

  // Get app user client
  static appUserClient(appUserId) {
    return BoxSdk.getAppAuthClient('user', appUserId);
  }

  // Create new app user
  static async fetchBoxAppUser(username, externalId) {
    let boxAppUserId
    let serviceAccountClient = this.serviceAccountClient();

    // fetch app user by external ID
    let appUsers = await serviceAccountClient.users.get("", {external_app_user_id: externalId})

    // does app user already exist? if not, create one
    if(appUsers.total_count > 0) {
      boxAppUserId = appUsers.entries[0].id
    } else {
      let newAppUser = await serviceAccountClient.enterprise.addAppUser(username, {external_app_user_id: externalId});
      boxAppUserId = newAppUser.id
    }
    return boxAppUserId
  }

  // Get app user access token
  static getAppUserToken(appUserId) {
    return new Promise((resolve, reject) => {
      BoxSdk.getAppUserTokens(appUserId, function(err, tokens) {
        if (err) {
          reject(err);
        } else {
          resolve(tokens.accessToken);
        }
      });
    });
  }

  // Get current app user info
  static async getUserInfo(appUserId) {
    let client = this.appUserClient(appUserId);
    return await client.users.get(client.CURRENT_USER_ID, {fields: "external_app_user_id,name,login,created_at"});
  }
}
