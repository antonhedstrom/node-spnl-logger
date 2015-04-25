define([
  'app',
  'backbone'
], function(
  App,

  Backbone
) {

  var exports = {};

  return Backbone.Model.extend({
    url: '/api/newsletters/',
    defaults: {
      cached: false
    }
  });

});
