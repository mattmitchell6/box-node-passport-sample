var expect = require('expect');
const Promise = require('bluebird');
const async = Promise.coroutine;

var BoxUtils = require("../box-service/boxUtils");
const TEST_USER = 'Test User';

describe('boxUtils', () => {
  var serviceAccountClient;
  var appUser;

  before(async(function* () {
    serviceAccountClient = BoxUtils.serviceAccountClient();
    appUser = yield serviceAccountClient.enterprise.addAppUser(TEST_USER, null)
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
    it('should create new box app user (and delete it)', async(function* () {
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
    it('should get app user token', async(function* () {
      var token = yield BoxUtils.getAppUserToken(appUser.id);

      expect(token).toExist();
      expect(token).toBeA('string');
    }));
  });

  after(async(function* () {
    yield serviceAccountClient.users.delete(appUser.id, {force: true});
  }));
});
