const expect = require('expect');

const BoxUtils = require("../box-service/boxUtils");
const TEST_USER = 'Test User';

describe('boxUtils', () => {
  let serviceAccountClient;
  let appUser;

  before(async function() {
    this.timeout(5000);
    serviceAccountClient = BoxUtils.serviceAccountClient();
    appUser = await serviceAccountClient.enterprise.addAppUser(TEST_USER, null)
  });

  after(async () => {
    await serviceAccountClient.users.delete(appUser.id, {force: true});
  });

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
      let client = BoxUtils.appUserClient(appUser.id);
      expect(client).toExist();
    });
  });

  describe('fetchBoxAppUser', () => {
    it('should create new box app user (and delete it)', async function() {
      this.timeout(5000);
      try {
        let appUserId = await BoxUtils.fetchBoxAppUser(TEST_USER, null);
        expect(appUserId).toExist();
        expect(appUserId).toBeA('string');

        serviceAccountClient.users.delete(appUserId, {force: true});
      } catch(err) {
        throw new Error(err.response.body.status + ": " + err.response.body.code);
      }
    });
  });

  describe('getAppUserToken', () => {
    it('should get app user token', async function() {
      this.timeout(5000);
      let token = await BoxUtils.getAppUserToken(appUser.id);

      expect(token).toExist();
      expect(token).toBeA('string');
    });
  });

  describe('getUserInfo', () => {
    it('should get app user info', async () => {
      let userInfo = await BoxUtils.getUserInfo(appUser.id);

      expect(userInfo).toExist();
      expect(userInfo.id).toEqual(appUser.id);
    });
  });
});
