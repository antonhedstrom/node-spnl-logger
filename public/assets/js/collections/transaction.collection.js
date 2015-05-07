define([
  'app',
  'backbone',

  '../models/transaction.model'
], function(
  App,
  Backbone,

  TransactionModel
) {

  var TransactionCollection = Backbone.Collection.extend({
    url: '/api/transactions/',
    model: TransactionModel
  });

  return TransactionCollection;

});
