const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const Auth0Config = require('config').get('Auth0Config');
const request = require('request');

const BoxUtils = require('../box-service/boxUtils');

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: Auth0Config.domain,
    clientID: Auth0Config.clientID,
    clientSecret: Auth0Config.clientSecret,
    callbackURL: Auth0Config.redirectUri
  },
  async function(accessToken, refreshToken, extraParams, profile, done) {
    // fetch or create box app user from external auth0 id
    let boxAppUserId = await BoxUtils.fetchBoxAppUser(profile.displayName, profile._json.sub);

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
