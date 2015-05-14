var passport = require('passport'),
    PassportLocalStrategy = require('passport-local').Strategy,
    pbkdf2Settings = require('../settings').pbkdf2;

  var User = require('./models/user-model');

module.exports = function() {

  // Setup new passport strategies
  passport.use('local-spnl-signup', createSignupStrategy());
  passport.use('local-spnl-login', createLoginStrategy());
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  console.log('Passport initialized.'.green);

  function createSignupStrategy() {
    var options = {
      passReqToCallback: true,
      usernameField: pbkdf2Settings.usernameField,
      passwordField: pbkdf2Settings.passwordField
    };
    return new PassportLocalStrategy(options, signup);
  }

  function createLoginStrategy() {
    var options = {
      passReqToCallback: false,
      usernameField: pbkdf2Settings.usernameField,
      passwordField: pbkdf2Settings.passwordField
    };
    return new PassportLocalStrategy(options, authenticate);
  }

  function serializeUser(user, cb) {
    cb(null, user.get('id'));
  }

  function deserializeUser(userId, cb) {
    User.forge({
      id: userId
    }).fetch({
      require: true
    }).then(function(user) {
      return cb(null, user.toJSON());
    }).catch(function(err) {
      return cb(err);
    });
  }

  /*
  Create new user if the username does not already exists
  */
  function signup(req, username, password, cb) {
    User.forge({
      name: username
    }).fetch({
      require: true,
      limit: 1
    }).then(function userExists(existingUser) {
      // Username already exists. Throw error. :(
      cb(null, false, { message:'Username is already taken. Try another.' });
    }).catch(function usernameAvailable(err) {
      // Yey! Username available! Create new user.
      var user = new UserModel(/* Data? */);
      user.save(null, {
        method: 'insert'
      }).then(function(user) {
        cb(null, user);
      }).catch(function(err) {
        cb(err);
      });

    });
  }

  function authenticate(username, password, cb) {
    User.forge({
      username: username
    }).fetch({
      require: true,
      limit: 1
    }).then(function(user) {
      return user.checkPassword(password, cb);
    }).catch(function(err) {
      return cb(null, false, { message: 'Incorrect username.' });
    });
  }
  return;
};
