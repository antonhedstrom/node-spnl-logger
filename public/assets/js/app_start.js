define([
  'require',
  'marionette',
  'backbone',
  'underscore'
], function(
  require,
  Marionette,
  Backbone,
  _
) {

  var App = new Backbone.Marionette.Application();

  App.addRegions({
    mainRegion: 'body'
  });

  App.navigate = function(route, options) {
    if ( route[0] !== '#' ) {
      route = '#' + route;
    }
    options = _.defaults(options || {}, {
      trigger: true
    });
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

  App.models = {};
  App.collections = {};

  return App;
});
