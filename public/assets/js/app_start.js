define([
  'require',
  'marionette',
  'backbone',

  ''
], function(
  require,
  Marionette,
  Backbone
) {

  var App = new Backbone.Marionette.Application();

  App.addRegions({
    mainRegion: 'body'
  });

  App.navigate = function (route, options) {
    if ( route[0] !== '#' ) {
      route = '#' + route;
    }
    options = options || {};
    Backbone.history.navigate(route, options);
  };

  App.addInitializer(function(options) {
    require([
      './router',
    ], function(
      AppRouter
    ) {
      new AppRouter();



      Backbone.history.start({
        pushState: false
      });
    });
  });

  return App;
});
