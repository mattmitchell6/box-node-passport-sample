const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const Auth0Config = require('config').auth0Config;
const BoxConfig = require('config').boxAppSettings;
const request = require('request');

const BoxSdk = require('../box/boxSdk');

/**
 *  Configure Passport to use Auth0
 */
const strategy = new Auth0Strategy(
  {
    domain: Auth0Config.domain,
    clientID: Auth0Config.clientID,
    clientSecret: Auth0Config.clientSecret,
    callbackURL: Auth0Config.redirectUri
  },
  async function(accessToken, refreshToken, extraParams, profile, done) {
    // fetch or create box app user from external auth0 id
    let username = profile.displayName;
    let externalId = profile._json.sub;
    let serviceAccountClient = BoxSdk.getAppAuthClient('enterprise', BoxConfig.enterpriseID);
    let appUser = await serviceAccountClient.users.get("", {external_app_user_id: externalId})

    // does app user already exist? if not, create one
    if(appUser.total_count > 0) {
      boxAppUserId = appUser.entries[0].id
    } else {
      let newAppUser = await serviceAccountClient.enterprise.addAppUser(username, {external_app_user_id: externalId});
      boxAppUserId = newAppUser.id
    }

    profile.boxId = boxAppUserId
    return done(null, profile);
  }
);

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
