var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PassportLocalMongoose = require('passport-local-mongoose');

var BoxUtils = require('../box-service/boxUtils');

var userSchema = new Schema({
    username: String,
    password: String,
    boxId: String
});

userSchema.plugin(PassportLocalMongoose);

// create new app user and add user to database
userSchema.statics.newUser = function(user) {
  var client = BoxUtils.serviceAccountClient();

  // check if user with submitted name exists
  return new Promise((resolve, reject) => {
    User.findOne({username: user.username}, function(err, user) {
      if(err) {
        reject(err);
      } else {
        if(!user) {
          resolve();
        } else {
          reject({message: "user already exists"});
        }
      }
    });
  })
  // create Box app user
  .then(() => {
    return new Promise((resolve, reject) => {
      client.enterprise.addAppUser(user.username, null)
        .then((boxAppUser) => { resolve(boxAppUser.id); })
        .catch((err) => { reject(err); });
    });
  })
  // add new user to database
  .then((boxAppUserId) => {
    return new Promise((resolve, reject) => {
      User.register(
        new User({username: user.username, boxId: boxAppUserId}), user.password, function(err, user) {
        if (err) { reject(err); }
        else { resolve(user); }
      });
    });
  });
}

var User = mongoose.model('User', userSchema);

module.exports = User;
