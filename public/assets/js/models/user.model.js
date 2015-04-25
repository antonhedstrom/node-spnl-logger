define([
  'app',
  'backbone',
  'jquery'
], function(
  App,
  Backbone,
  $
) {

  var exports = {};

  return Backbone.Model.extend({
    urlRoot: '/api/users',
    defaults: {
      id: 'me', // Will result in /api/users/me
      username: null,
      firstname: null,
      lastname: null

    },

    authenticate: function(username, password) {
      return $.Deferred(function(defer) {
        $.post('/api/auth/login', {
          username: username,
          password: password
        }).then( defer.resolve, defer.reject );
      });
    }
  });

});
