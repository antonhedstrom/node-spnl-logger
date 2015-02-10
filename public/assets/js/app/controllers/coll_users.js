define([
  'app',
  'backbone'
], function(
  App,

  Backbone
) {

  var exports = {};

  var Users = Backbone.Collection.extend({
    urlRoot: '/api/users/'
  });

  exports = Users;
  return exports;

});
