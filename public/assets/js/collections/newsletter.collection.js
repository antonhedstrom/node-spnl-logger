define([
  'app',
  'backbone',
  '../models/newsletter.model'
], function(
  App,
  Backbone,
  NewsletterModel
) {

  return Backbone.Collection.extend({
    url: '/api/newsletters/',
    model: NewsletterModel,

    // fetch: function(options) {
    //   return Backbone.Collection.prototype.fetch(options);
    // }
  });

});
