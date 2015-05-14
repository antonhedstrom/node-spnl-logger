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

  var REGEXPS = {
    YEAR: /^\d{4}$/,
    YEARMONTH: /^\d{4}-\d{2}$/,
    YEARMONTHDAY: /^\d{4}-\d{2}-\d{2}$/
  };

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
        model: this.userModel
      });
      var newsletterListView = new NewsletterCompositeView({
        collection: this.newsletterCollection
      });

      this.header.show(usermenuView);
      this.content.show(newsletterListView);
    },

    loadData: function(routePath) {
      var filter = _.extend({
        is_paid: 'n'
      }, this.extractFilterFromRoutePath(routePath));

      this.newsletterCollection.fetch({
        data: filter
      });
      this.userModel.fetch();
    },

    extractFilterFromRoutePath: function(routePath) {
      var filter = {};
      var tsFrom;
      var tsTo;
      if ( !routePath ) {
        return {};
      }
      routePath = routePath.split('/');
      if ( REGEXPS.YEAR.test(routePath[0]) ) {
        dateFrom = new Date(routePath[0].match(REGEXPS.YEAR)[0] + '-01-01 00:00:00');
        dateTo = new Date((+routePath[0].match(REGEXPS.YEAR)[0] + 1) + '-01-01 00:00:00');
        filter.from = dateFrom.getTime();
        filter.to = dateTo.getTime();
      }

      return filter;
    },

    destroy: function() {
      this.newsletterCollection = null;
      this.userModel = null;
    }
  });

  return Layout;
});
