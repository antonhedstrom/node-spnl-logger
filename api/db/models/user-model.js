var crypto = require('crypto'),
    pbkdf2Settings = require('../../../settings').db.mysql.pbkdf2,
    LocalStrategy = require('passport-local').Strategy;

module.exports = function(bookshelf) {

  return bookshelf.Model.extend({ // Instance properties:
    tableName: 'user',
    idAttribute: 'name',

    checkPassword: function(password, done) {
      var self = this;
      return crypto.pbkdf2(
        password,
        pbkdf2Settings.salt,
        pbkdf2Settings.iterations,
        pbkdf2Settings.keylen,
        function(err, hashRaw) {
          if (err) {
            return done(null, false, err);
          }

          var hash = new Buffer(hashRaw, 'binary').toString(pbkdf2Settings.encoding);

          if ( hash === self.get('hash') ) {
            return done(null, self);
          }
          else {
            return done(null, false, {msg: 'Incorrect password'});
          }
        }
      );
    }

  }, { // Class properties:

    createStrategies: function(passport) {
      passport.use('local-spnl-signup', this.createSignupStrategy());
      passport.use('local-spnl-login', this.createLoginStrategy());
      passport.serializeUser(this.serializeUser());
      passport.deserializeUser(this.deserializeUser());
      console.log('Passport initialized.'.green);
    },

    createSignupStrategy: function() {
      var options = {
        passReqToCallback: true,
        usernameField: pbkdf2Settings.usernameField,
        passwordField: pbkdf2Settings.passwordField
      };
      return new LocalStrategy(options, this.signup());
    },

    createLoginStrategy: function(self) {
      var options = {
        passReqToCallback: false,
        usernameField: pbkdf2Settings.usernameField,
        passwordField: pbkdf2Settings.passwordField
      };
      return new LocalStrategy(options, this.authenticate());
    },

    serializeUser: function() {
      return function(user, done) {
        done(null, user.get('id'));
      };
    },

    deserializeUser: function() {
      var self = this;

      return function(userId, done) {
        self.forge({
          id: userId
        }).fetch({
          require: true
        }).then(function(user) {
          return done(null, user.toJSON());
        }).catch(function(err) {
          return done(err);
        });
      };
    },

    /*
    Create new user if the username does not already exists
    */
    signup: function() {
      var self = this;
      return function(req, username, password, done) {
        self.forge({
          name: username
        }).fetch({
          require: true,
          limit: 1
        }).then(function userExists(existingUser) {
          // Username already exists. Throw error. :(
          done(null, false, {type:'signupErrorMessage', msg:'Username is already taken. Try another.'});
        }).catch(function usernameAvailable(err) {
          // Yey! Username available! Create new user.
          self.save(null, {
            method: 'insert'
          }).then(function(user) {
            done(null, user);
          }).catch(function(err) {
            done(err);
          });

        });
      };
    },

    authenticate: function() {
      var self = this;
      return function(username, password, done) {
        self.forge({
          name: username
        }).fetch({
          require: true,
          limit: 1
        }).then(function(user) {
          return user.checkPassword(password, done);
        }).catch(function(err) {
          return done(err);
        });
      };
    }


  });
};
