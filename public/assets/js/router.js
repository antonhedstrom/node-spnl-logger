define([
  'app',
  'marionette',
  'backbone',
  'backbone.radio',

  './screens/scr.userprofile',
  './screens/scr.newsletters',
  './screens/scr.transactions'
], function(
  App,
  Marionette,
  Backbone,
  BackboneRadio,

  ProfileScreenLayout,
  NewslettersScreenLayout,
  TransactionsScreenLayout
) {

  var appChannel = BackboneRadio.channel('app');

  var MyController = Marionette.Controller.extend({

    showNewslettersScreen: function(path) {
      var layout = new NewslettersScreenLayout();
      App.mainRegion.show(layout);
      layout.loadData(path);
    },

    showPaymentsScreen: function() {
      var layout = new TransactionsScreenLayout();
      App.mainRegion.show(layout);
      layout.loadData();
    },

    showProfileScreen: function() {
      var layout = new ProfileScreenLayout();
      App.mainRegion.show(layout);
      layout.loadData();
    },

    showStatistics: function() {

    },

    defaultRoute: function() {
      App.navigate('home');
    }

  });

  var MyRouter = Backbone.Marionette.AppRouter.extend({
    initialize: function() {
    },
    controller: new MyController(),
    appRoutes: {
      'home(/*path)': 'showNewslettersScreen',
      'profile': 'showProfileScreen',
      'payments': 'showPaymentsScreen',
      'newsletters(/*path)': 'showNewslettersScreen',
      'stats': 'showStatistics',

      '*path': 'defaultRoute'
    },

    destroy: function() {
    }
  });


  return MyRouter;
});
