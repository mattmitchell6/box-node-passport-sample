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
  // check if user with submitted name exists
  return User.findOne({username: user.username})
    .then((user) => {
      if(user) {
        throw new Error('user already exists');
      } else {
        return;
      }
    })
  // create Box app user
  .then(() => {
    return BoxUtils.newAppUser(user.username);
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
