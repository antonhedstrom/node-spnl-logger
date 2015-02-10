define([
  'app',
  'backbone'
], function(
  App,

  Backbone
) {

  var exports = {};

  exports.User = Backbone.Model.extend({
    urlRoot: '/api/users/'
  });

  return exports;

});
