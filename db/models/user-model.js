var crypto = require('crypto'),
    pbkdf2Settings = require('../../settings').pbkdf2,
    bookshelf = require('bookshelf').myInstance;

module.exports = bookshelf.Model.extend({
  tableName: 'user',
  idAttribute: 'id',

  checkPassword: function(password, done) {
    var self = this;
    return crypto.pbkdf2(
      password,
      pbkdf2Settings.salt,
      pbkdf2Settings.iterations,
      pbkdf2Settings.keylen,
      function(err, hashRaw) {
        if (err) {
          return done(null, false, { message: 'Incorrect password' });
        }

        var hash = new Buffer(hashRaw, 'binary').toString(pbkdf2Settings.encoding);
        if ( hash === self.get('hash') ) {
          return done(null, self);
        }
        else {
          return done(null, false, { message: 'Incorrect password' });
        }
      }
    );
  }
});
