define([
  'app',
  'marionette',

  'tpl!./templates/main',

  // Models and collections
  '../models/user.model',
  '../collections/transaction.collection',

  // Views
  '../views/transactions.compview',
  '../views/user-menu'
], function(
  App,
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

      if ( !App.models.user ) {
        App.models.user = new UserModel();
      }
      this.userModel = App.models.user;
    },

    onRender: function() {
      var usermenuView = new UserMenuView({
        model: this.userModel,
        activeMenuItem: 'payments'
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
    },

    destroy: function() {
      this.transactionCollection = null;
      this.userModel = null;
    }
  });

  return Layout;
});
