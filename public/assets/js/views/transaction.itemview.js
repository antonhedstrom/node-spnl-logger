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
    },
    events: {
    },

    templateHelpers: {
      formatDate: function(timestamp) {
        var d = new Date(timestamp);
        return d.getFullYear() + '-' + Utils.pad(d.getMonth()+1) + '-' + Utils.pad(d.getDate());
      },
      formatSum: function(sum) {
        return parseFloat(sum.toFixed(2)).toLocaleString('sv');
      }
    },
  });

  return TransactionItemView;
});
