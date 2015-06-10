define([
  'app',
  'backbone',
  'marionette',
  'alertify',
  '../utils/utils',

  'tpl!./templates/transaction'
], function(
  App,
  Backbone,
  Marionette,
  Alertify,
  Utils,

  TransactionTemplate
) {

  var TransactionItemView = Marionette.ItemView.extend({
    template: TransactionTemplate,
    tagName: 'tr',
    ui: {
      btnDelete: '.actions .delete'
    },
    events: {
      'click @ui.btnDelete': 'deleteTransaction'
    },

    templateHelpers: {
      formatDate: function(timestamp) {
        var d = new Date(timestamp);
        return d.getFullYear() + '-' + Utils.pad(d.getMonth()+1) + '-' + Utils.pad(d.getDate());
      },
      formatSum: function(sum) {
        return parseFloat(sum.toFixed(2)).toLocaleString('sv');
      },
      isNew: function() {
        return this.isRecentlyAdded;
      },
      hasComment: function() {
        return this.comment && this.comment.length > 0;
      }
    },

    deleteTransaction: function(e) {
      if ( e ) {
        e.stopPropagation();
        e.preventDefault();
      }
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
          self.model.set('deletedFail', true);
        }
      });
    },
  });

  return TransactionItemView;
});
