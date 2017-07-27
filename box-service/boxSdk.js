/**
 *  Create Box node sdk object
 */
var BoxSdk = require('box-node-sdk');
var BoxConfig = require('config').boxAppSettings;

// Set up the Box SDK
module.exports = new BoxSdk({
	clientID: BoxConfig.clientID,
	clientSecret: BoxConfig.clientSecret,
	appAuth: {
		keyID: BoxConfig.appAuth.publicKeyID,
		privateKey: BoxConfig.appAuth.privateKey,
		passphrase: BoxConfig.appAuth.passphrase
	}
});
