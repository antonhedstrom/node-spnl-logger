define([
  'app',
  'backbone',
  'marionette',
  'alertify',

  'tpl!./templates/newsletter'
], function(
  App,
  Backbone,
  Marionette,
  Alertify,

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
      var self = this;
      self.$el.hide();
      this.model.destroy({
        wait: true,
        success: function(model, response, options) {

        },
        error: function(model, response, options) {
          // Add the model back to the collection
          Alertify.error(response.responseText);
          self.$el.show();
        }
      });
    },
  });

  return NewsletterItemView;
});
