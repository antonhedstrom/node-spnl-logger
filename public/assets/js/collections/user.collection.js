define([
  'app',
  'backbone',
  '../models/user.model'
], function(
  App,
  Backbone,
  UserModel
) {

  return Backbone.Collection.extend({
    urlRoot: '/api/users/',
    model: UserModel
  });


});
