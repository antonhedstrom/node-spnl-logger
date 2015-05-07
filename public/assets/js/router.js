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

    showNewslettersScreen: function() {
      var layout = new NewslettersScreenLayout();
      App.mainRegion.show(layout);
      layout.loadData();
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

    }

  });

  var MyRouter = Backbone.Marionette.AppRouter.extend({
    initialize: function() {
    },
    controller: new MyController(),
    appRoutes: {
      'home': 'showNewslettersScreen',
      'profile': 'showProfileScreen',
      'payments': 'showPaymentsScreen',
      'newsletters': 'showNewslettersScreen',
      'stats': 'showStatistics',

      '*path': 'showNewslettersScreen'
    },

    destroy: function() {
    }
  });


  return MyRouter;
});
