define([
  'app',
  'marionette',

  'tpl!./templates/main',

  // Models and collections
  '../models/user.model',
  '../collections/newsletter.collection',

  // Views
  '../views/newsletters.compview',
  '../views/user-menu'
], function(
  App,
  Marionette,

  MainTemplate,

  // Models and collections
  UserModel,
  NewsletterCollection,

  // Views
  NewsletterCompositeView,
  UserMenuView
) {
  var Layout = Backbone.Marionette.LayoutView.extend({
    template: MainTemplate,

    regions: {
      header: 'header',
      content: '.content'
    },

    initialize: function(options) {
      this.newsletterCollection = new NewsletterCollection();

      if ( !App.models.user ) {
        App.models.user = new UserModel();
      }
      this.userModel = App.models.user;
    },

    onRender: function() {
      var usermenuView = new UserMenuView({
        model: this.userModel,
        activeMenuItem: 'home'
      });
      var newsletterListView = new NewsletterCompositeView({
        collection: this.newsletterCollection
      });

      this.header.show(usermenuView);
      this.content.show(newsletterListView);
    },

    loadData: function() {
      this.newsletterCollection.fetch({
        data: {
          is_paid: 'n'
        }
      });
      this.userModel.fetch();
    },

    destroy: function() {
      this.newsletterCollection = null;
      this.userModel = null;
    }
  });

  return Layout;
});
