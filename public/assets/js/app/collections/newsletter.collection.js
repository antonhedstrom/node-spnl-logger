define([
  'app',
  'backbone',
  '../models/newsletter.model'
], function(
  App,
  Backbone,
  NewsletterModel
) {

  var exports = {};

  exports.User = Backbone.Collection.extend({
    urlRoot: '/api/newsletters/',
    model: NewsletterModel
  });

  return exports;

});
