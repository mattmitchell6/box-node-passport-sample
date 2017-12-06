Get up and running with this simple Box Platform that uses the [Express](http://expressjs.com/)
web framework and [Passport](http://passportjs.org/) to authenticate/manage users.

## Prerequisites

[Browserify](http://browserify.org/) - for bundling custom styling & javascript

## Instructions

Follow the steps below to get the app running on your local machine.

First, clone the repository and install dependencies.
```bash
$ git clone git@git-it.ad.whirl.net:Demo-Engineering/box-node-auth0-boilerplate.git
$ cd box-node-auth0-boilerplate
$ npm install
```

Create a new custom Box application (https://developer.box.com/docs/configuring-service-accounts) and add the generated configuration variables (with generated private key) to the local.js file in the config folder (rename local.sample.js to local.js).

Start the server.

```bash
$ npm run start-dev
```

Open a web browser and navigate to [http://localhost:3000/](http://127.0.0.1:3000/)
to see the example in action.

### Running Tests

Make sure mongoDB is running in a separate window.
```bash
$ npm test
```
