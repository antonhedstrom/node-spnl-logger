define([
  'app',
  'backbone',
  'marionette',
  'underscore',

  'jquery.datetimepicker',
  'alertify',
  '../utils/utils',

  '../models/transaction.model',
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

  TransactionModel,
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
      inputDateline: 'input[name=dateline]',
      inputAmount: 'input[name=amount]',
      inputDesc: 'input[name=comment]',
      btnAdd: '.add-row .btn-add-new'
    },

    events: {
      'click @ui.btnAdd': 'addPayment',
      'keypress @ui.inputDesc': 'onKeyPressLastInput',
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
    },

    onKeyPressLastInput: function(e) {
      var code = e.keyCode || e.which;

      if ( code === 13 ) { // Enter
        this.addPayment(e);
      }
    },

    addPayment: function(e) {
      var transactionModel,
          transactionPromise,
          errs,
          self = this;

      if ( e ) {
        e.preventDefault();
        e.stopPropagation();
      }
      var data = this.getFormValues();
      data.isLoading = true;
      data.isRecentlyAdded = true;

      transactionModel = new TransactionModel(data);
      transactionPromise = transactionModel.save();

      if ( !transactionModel.isValid() || transactionPromise === false ) {
        errs = transactionModel.validationError;
        if ( errs.focus in this.ui ) {
          this.ui[errs.focus].focus();
        }
        Alertify.error(errs.msg, 'error', 4);
      }
      else {
        this.collection.add(transactionModel, {at: 0});
        transactionPromise.done(function(data, response, options) {
          data.isLoading = false;
          transactionModel.set(data);
          self.render();
          Alertify.success('Success!', 'success', 3);
        }).fail(function(xhr, err, msg) {
          var errors = xhr.responseJSON;
          Alertify.alert(errors.msg + '<br/>' + errors.errno + ' (' + errors.code + ')');
          self.collection.remove(transactionModel);
          self.setFormValues(transactionModel.toJSON());
        })
      }
    },

    getFormValues: function() {
      return {
        dateline: this.ui.inputDateline.val(),
        amount: parseInt(this.ui.inputAmount.val(), 10),
        comment: this.ui.inputDesc.val() || ''
      };
    },

    setFormValues: function(values) {
      this.ui.inputDateline.val(values.dateline);
      this.ui.inputAmount.val(values.amount);
      this.ui.inputDesc.val(values.comment);
    },

  });

  return TransactionsCompView;
});
