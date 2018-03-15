Get up and running with this simple Box Platform app that uses the [Express](http://expressjs.com/)
web framework and [Passport](http://passportjs.org/) to authenticate/manage users.

## Prerequisites
[Mongodb](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) - for storing user objects (username, password, Box app user id)

## Instructions

Follow the steps below to get the app running on your local machine.

First, clone the repository and install dependencies.
```bash
$ git clone https://github.com/mattmitchell6/box-node-passport-sample.git
$ cd box-node-passport-sample
$ npm install
```

Create a new [Box application](https://developer.box.com/docs/configuring-service-accounts) and add the generated configuration variables (with generated private key) to the local.js file in the config folder (rename local.sample.js to local.js).

Make sure mongoDB is running in a separate terminal tab. This local database is used to store the user objects (including the created box app user id).

```bash
$ mongod
```

Start the server.

```bash
$ npm start
```

Open a web browser and navigate to [http://localhost:3000/](http://127.0.0.1:3000/)
to see the example in action.
