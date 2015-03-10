define([
  'require',
  'marionette',
  'backbone'
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

  App.on('start', function(options) {
    require(['./views/main.layout'], function(MainLayout) {
      var layout = new MainLayout();
      App.mainRegion.show(layout);
    });

    if ( Backbone.history ) {
      res = Backbone.history.start({
        pushState: true
      });
    }

  });


  return App;
});
