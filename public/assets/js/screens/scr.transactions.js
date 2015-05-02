define([
  'marionette',

  'tpl!./templates/main',

  // Models and collections
  '../models/user.model',
  '../collections/transaction.collection',

  // Views
  '../views/transactions.compview',
  '../views/user-menu'
], function(
  Marionette,

  MainTemplate,

  // Models and collections
  UserModel,
  TransactionCollection,

  // Views
  TransactionCompositeView,
  UserMenuView
) {
  var Layout = Backbone.Marionette.LayoutView.extend({
    template: MainTemplate,

    regions: {
      header: 'header',
      content: '.content'
    },

    initialize: function(options) {
      this.transactionCollection = new TransactionCollection();
      this.userModel = new UserModel();
    },

    onRender: function() {
      var usermenuView = new UserMenuView({
        model: this.userModel
      });
      var transactionListView = new TransactionCompositeView({
        collection: this.transactionCollection
      });

      this.header.show(usermenuView);
      this.content.show(transactionListView);
    },

    loadData: function() {
      this.transactionCollection.fetch();
      this.userModel.fetch();
    }
  });

  return Layout;
});
