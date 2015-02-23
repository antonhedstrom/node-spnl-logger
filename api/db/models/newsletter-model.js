
module.exports = function(bookshelf) {
  return bookshelf.Model.extend({
    tableName: 'events',
    idAttribute: 'id',
    transaction: function() {
      var Transaction = require('./transaction-model')(bookshelf);
      return this.belongsTo(Transaction, 'paymentid');
    }
  });
};
