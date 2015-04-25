define([
  'app',
  'backbone',
  'marionette',

  'tpl!./templates/newsletter'
], function(
  App,
  Backbone,
  Marionette,

  NewsletterTemplate
) {

  var NewsletterItemView = Marionette.ItemView.extend({
    template: NewsletterTemplate,
    tagName: 'tr',
    ui: {
      btnEdit: '.actions .edit',
      btnDelete: '.actions .delete'
    },
    events: {
      'click @ui.btnEdit': 'viewEditNewsletterView',
      'click @ui.btnDelete': 'deleteNewsletter'
    },

    templateHelpers: {
      formatDate: function(timestamp) {
        var d = new Date(timestamp);
        return d.toLocaleString('sv');
      }
    },

    viewEditNewsletterView: function(e) {
      var $el = $(e.currentTarget);
      alert('Not implemented');
    },
    deleteNewsletter: function(e) {
      this.model.destroy();
    },
  });

  return NewsletterItemView;
});
