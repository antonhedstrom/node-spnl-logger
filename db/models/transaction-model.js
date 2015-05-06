var bookshelf = require('bookshelf').myInstance,
    Newsletter = require('./newsletter-model');

module.exports = bookshelf.Model.extend({
  tableName: 'payments',
  idAttribute: 'id',

  newsletters: function() {
    return this.hasMany(Newsletter, 'paymentid');
  }
});

