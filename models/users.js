var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PassportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    boxId: String
});

User.plugin(PassportLocalMongoose);

module.exports = mongoose.model('User', User);
