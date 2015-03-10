define([
  'app',
  'backbone',
  '../models/transaction.model'
], function(
  App,
  Backbone,
  TransactionModel
) {

  var exports = {};

  exports.User = Backbone.Collection.extend({
    urlRoot: '/api/transactions/',
    model: TransactionModel
  });

  return exports;

});
