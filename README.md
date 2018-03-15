Get up and running with this simple Box Platform app that uses the [Express](http://expressjs.com/)
web framework and [Passport](http://passportjs.org/) + [Auth0](https://auth0.com/) to authenticate/manage users.

## Instructions

Follow the steps below to get the app running on your local machine.

First, clone the repository and install dependencies.
```bash
$ git clone https://github.com/mattmitchell6/box-node-auth0-sample.git
$ cd box-node-auth0-sample
$ npm install
```
#### Box Configuration
Create a new custom Box application (https://developer.box.com/docs/configuring-service-accounts) and add the generated configuration variables (with generated private key) to the local.js file in the config folder (rename local.sample.js to local.js).

#### Auth0 Configuration

##### Step 1. Sign up for a free Auth0 account and configure your first client.
1. Sign up for a free trial account at [Auth0's site](https://auth0.com/).
2. You can optionally view their setup and quickstart materials by selecting **Web App** from their [documentation page](https://auth0.com/docs).
3. Navigate to the [clients page](https://manage.auth0.com/#/clients). You should automatically have a client name **Default**.
4. In the "Allowed Callback URLs" section, add `http://localhost:3000/callback`.
5. Set the "Client Type" to "Regular Web Application".
6. Retrieve the following values:
    * Domain
    * Client ID
    * Client Secret

##### Step 2. Add Auth0 configuration values to the Node Express application.
1. Navigate to `box-node-auth0-sample` > `config` > `local.js`
2. In the `local.js` file, replace these values with those from your Auth0 client:
    * Under `module.exports.Auth0Config`
    * `clientId`
    * `clientSecret`
    * `domain`

#### Start the server

```bash
$ npm start
```

Open a web browser and navigate to [http://localhost:3000/](http://127.0.0.1:3000/)
to see the example in action.
