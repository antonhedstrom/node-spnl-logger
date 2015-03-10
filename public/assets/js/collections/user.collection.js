define([
  'app',
  'backbone',
  '../models/user.model'
], function(
  App,
  Backbone,
  UserModel
) {

  var exports = {};

  exports.User = Backbone.Collection.extend({
    urlRoot: '/api/users/',
    model: UserModel
  });

  return exports;

});
