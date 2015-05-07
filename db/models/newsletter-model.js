var bookshelf = require('bookshelf').myInstance,
    Transaction = require('./transaction-model');

module.exports = bookshelf.Model.extend({
  tableName: 'events',
  idAttribute: 'id',

  transaction: function() {
    return this.belongsTo(Transaction, 'paymentid');
  }
});
