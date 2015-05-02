define([
  'app',
  'backbone',
  'marionette',
  'underscore',

  'jquery.datetimepicker',
  'alertify',
  '../utils/utils',

  './transaction.itemview',
  'tpl!./templates/transactions',
], function(
  App,
  Backbone,
  Marionette,
  _,

  DatetimePicker,
  Alertify,
  Utils,

  TransactionItemView,
  TransactionsTemplate
) {

  var TransactionsCompView = Marionette.CompositeView.extend({
    template: TransactionsTemplate,
    childView: TransactionItemView,
    childViewContainer: "tbody",
    tagName: 'div',
    className: 'transaction-list',

    initialize: function(options) {
    },

    ui: {
    },

    events: {
    },

    modelEvents: {
      'change': 'render'
    },

    collectionEvents: {
      'change': 'render',
      'sync': 'render',
      //'add': 'render', // https://github.com/marionettejs/backbone.marionette/issues/640
      'remove': 'render'
    },

    onRender: function() {
      var now = new Date();
      this.$el.find('.date > input').datetimepicker({
        lang: 'en',
        format: 'Y-m-d',
        value: now.getFullYear() + '-' + Utils.pad((now.getMonth()+1)) + '-' + Utils.pad(now.getDate())
      });
    }

  });

  return TransactionsCompView;
});
