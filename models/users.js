var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PassportLocalMongoose = require('passport-local-mongoose');
var {coroutine} = require('bluebird');

var BoxUtils = require('../box-service/boxUtils');

var userSchema = new Schema({
  username: String,
  password: String,
  boxId: String
});

userSchema.plugin(PassportLocalMongoose);

// create new app user and add user to database
userSchema.statics.newUser = coroutine(function* (user) {
  var dbUser;
  var newAppUser;

  // check if user with submitted name exists
  dbUser = yield User.findOne({username: user.username});
  if(dbUser) {
    throw new Error('user already exists');
  }

  // create Box app user
  newAppUser = yield BoxUtils.newAppUser(user.username);

  // add new user to database
  return new Promise((resolve, reject) => {
    User.register(
      new User({username: user.username, boxId: newAppUser}), user.password, function(err, user) {
      if (err) { reject(err); }
      else { resolve(user); }
    });
  });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
