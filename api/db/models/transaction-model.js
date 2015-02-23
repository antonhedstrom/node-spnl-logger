
module.exports = function(bookshelf) {
  return bookshelf.Model.extend({
    tableName: 'payments',
    idAttribute: 'id',
    newsletters: function() {
      var Newsletter = require('./newsletter-model')(bookshelf);
      return this.hasMany(Newsletter, 'paymentid');
    }
  });
};
