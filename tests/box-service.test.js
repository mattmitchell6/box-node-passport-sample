var expect = require('expect');
var {coroutine} = require('bluebird');

var BoxUtils = require("../box-service/boxUtils");
const TEST_USER = 'Test User';

describe('boxUtils', () => {
  var serviceAccountClient;
  var appUser;

  before(coroutine(function* () {
    this.timeout(5000);
    serviceAccountClient = BoxUtils.serviceAccountClient();
    appUser = yield serviceAccountClient.enterprise.addAppUser(TEST_USER, null)
  }));

  after(coroutine(function* () {
    yield serviceAccountClient.users.delete(appUser.id, {force: true});
  }));

  it('should exist', () => {
    expect(BoxUtils).toExist();
  });

  describe('serviceAccountClient', () => {
    it('should exist', () => {
      expect(serviceAccountClient).toExist();
    });
  });

  describe('appUserClient', () => {
    it('should exist', () => {
      var client = BoxUtils.appUserClient(appUser.id);
      expect(client).toExist();
    });
  });

  describe('newAppUser', () => {
    it('should create new box app user (and delete it)', coroutine(function* () {
      this.timeout(5000);
      try {
        var appUserId = yield BoxUtils.newAppUser(TEST_USER);
        expect(appUserId).toExist();
        expect(appUserId).toBeA('string');

        serviceAccountClient.users.delete(appUserId, {force: true});
      } catch(err) {
        throw new Error(err.response.body.status + ": " + err.response.body.code);
      }
    }));
  });

  describe('getAppUserToken', () => {
    it('should get app user token', coroutine(function* () {
      var token = yield BoxUtils.getAppUserToken(appUser.id);

      expect(token).toExist();
      expect(token).toBeA('string');
    }));
  });

  describe('getUserInfo', () => {
    it('should get app user info', coroutine(function* () {
      var userInfo = yield BoxUtils.getUserInfo(appUser.id);

      expect(userInfo).toExist();
      expect(userInfo.id).toEqual(appUser.id);
    }));
  });
});
