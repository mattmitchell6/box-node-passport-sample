var expect = require('expect');
var {coroutine} = require('bluebird');
var mongoose = require('mongoose');

var BoxUtils = require("../box-service/boxUtils");
var User = require("../models/users");
var MongooseConfig = require('config').mongooseConfig;

const ERROR = 'user already exists';
const SAMPLE_USER = {
  username: 'Test User',
  password: 'password'
};


describe('users (mongoDB)', () => {
  var db;

  before(coroutine(function* () {
    db = mongoose.connect(MongooseConfig.databaseUrl);
    yield User.remove({username: SAMPLE_USER.username})
    // serviceAccountClient = BoxUtils.serviceAccountClient();
  }));

  after(coroutine(function* () {
    yield User.remove({username: SAMPLE_USER.username})
    mongoose.connection.close();
  }));

  it("should connect to database", () => {
    expect(db).toExist();
  });

  it("should create new database entry", coroutine(function* () {
    var user = new User(SAMPLE_USER);
    yield user.save();

    var foundUser = yield User.findOne({username: SAMPLE_USER.username});
    expect(foundUser.username).toEqual(user.username);
  }));
});
