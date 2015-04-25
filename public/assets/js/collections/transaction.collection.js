define([
  'app',
  'backbone',
  '../models/transaction.model'
], function(
  App,
  Backbone,
  TransactionModel
) {

  return Backbone.Collection.extend({
    urlRoot: '/api/transactions/',
    model: TransactionModel
  });

});
