define([
  'app',
  'marionette',
  'backbone',
  'backbone.radio',

  './screens/scr.home',
  './screens/scr.userprofile',
  './screens/scr.transactions'
], function(
  App,
  Marionette,
  Backbone,
  BackboneRadio,

  HomeScreenLayout,
  ProfileScreenLayout,
  TransactionsScreenLayout
) {

  var appChannel = BackboneRadio.channel('app');

  var MyController = Marionette.Controller.extend({

    initialize: function(options){
      this.stuff = options.stuff;
    },

    showHomeScreen: function() {
      var layout = new HomeScreenLayout();
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
    controller: new MyController(),
    appRoutes: {
      'home': 'showHomeScreen',
      'profile': 'showProfileScreen',
      'payments': 'showPaymentsScreen',
      'stats': 'showStatistics',

      '*path': 'showHomeScreen'
    }
  });


  return MyRouter;
});
