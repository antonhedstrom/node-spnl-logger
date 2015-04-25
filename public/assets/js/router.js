define([
  'app',
  'marionette',
  'backbone',
  'backbone.radio',

  './screens/scr.home',
  './screens/scr.userprofile'
], function(
  App,
  Marionette,
  Backbone,
  BackboneRadio,

  HomeScreenLayout,
  ProfileScreenLayout
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
      'stats': 'showStatistics',

      '*path': 'showHomeScreen'
    }
  });


  return MyRouter;
});
