Get up and running with this simple Box Platform that uses [Express](http://expressjs.com/)
as a framework and [Passport](http://passportjs.org/) to authenticate/manage users.

## Prerequisites
[Mongodb](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) [Browserify](http://browserify.org/)

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

Create new Box custom app and add the generated configuration variables to the local.js file in the config folder (rename local.sample.js to local.js).


```bash
$ git clone git@git-it.ad.whirl.net:Demo-Engineering/box-node-passport-boilerplate.git
$ cd box-node-passport-boilerplate
$ npm install
```

Make sure mongoDB is running in a separate terminal tab. This local database is used to store the user objects (including the created App User ID).

```bash
$ mongod
```

Start the server.

```bash
$ npm run start-dev
```

Open a web browser and navigate to [http://localhost:3000/](http://127.0.0.1:3000/)
to see the example in action.
