define([
  'app',
  'backbone'
], function(
  App,

  Backbone
) {

  var exports = {};

  return Backbone.Model.extend({
    defaults: {
      cached: false
    }
  });

});
