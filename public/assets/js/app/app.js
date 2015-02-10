define([
  'marionette',
  'app/views/main.layout'
], function(
  Marionette,

  MainLayout
) {
  var App = new Backbone.Marionette.Application();

  App.addRegions({
    mainRegion: 'body'
  });

  App.addInitializer(function(options) {
    var Model = Backbone.Model.extend();
    var layout = new MainLayout({
    });
    App.mainRegion.show(layout);
  });

  App.on("initialize:after", function(){
    Backbone.history.start({ pushState: true });
  });

  return App;
});
