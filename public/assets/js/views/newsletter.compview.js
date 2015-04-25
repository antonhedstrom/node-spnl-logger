define([
  'app',
  'backbone',
  'marionette',
  'underscore',

  './newsletter.itemview',
  'tpl!./templates/newsletters',
], function(
  App,
  Backbone,
  Marionette,
  _,

  NewsletterItemView,
  NewslettersTemplate
) {

  var newslettersCompView = Marionette.CompositeView.extend({
    template: NewslettersTemplate,
    childView: NewsletterItemView,
    childViewContainer: "tbody",
    tagName: 'div',
    className: 'newsletter-list',

    initialize: function(options) {
      this.model = new Backbone.Model({
        counter: 0,
        sum: 0
      });
    },

    ui: {
      'inputNumber': 'input[name=new-number]',
      'inputDateStart': 'input[name=new-date-start]',
      'inputDateEnd': 'input[name=new-date-end]',
      'inputDesc': 'input[name=new-desc]',
      'btnAdd': '.btn-add-new'
    },

    events: {
      'change @ui.inputNumber': 'changeNumber',
      'blur @ui.inputDateStart': 'onBlurDateStart',
      'keypress @ui.inputDesc': 'onKeyPressLastInput',
      'click @ui.btnAdd': 'addNewsletter'
    },

    modelEvents: {
      'change': 'render'
    },

    collectionEvents: {
      'change': 'render',
      'sync': 'reCalc',
      'add': 'reCalc',
      'remove': 'reCalc'
    },

    templateHelpers: {
      formatSum: function(sum) {
        return parseFloat(sum.toFixed(2)).toLocaleString('sv');
      }
    },

    reCalc: function() {
      var sum = _.reduce(this.collection.models, function(memo, model) {
        return memo + model.get('price');
      }, 0);

      this.model.set({
        counter: this.collection.length,
        sum: sum
      });
    },

    changeNumber: function(e) {
      console.log("Change", e);
    },

    onBlurDateStart: function(e) {
      var date = $(e.currentTarget).val();
      this.ui.inputDateEnd.val(date);
    },

    onKeyPressLastInput: function(e) {
      var code = e.keyCode || e.which;

      if ( code === 13 ) { // Enter
        this.addNewsletter();
      }
    },

    addNewsletter: function() {
      // TODO: Spara
      var data = {
        number: this.ui.inputNumber.val(),
        start_time: this.ui.inputDateStart.val(),
        end_time: this.ui.inputDateEnd.val(),
        dateline: new Date(),
        comment: this.ui.inputDesc.val(),
        cached: true,
        price: 10
      };
      console.log(data);

      this.collection.add(data, {at: 0});
    },

    destroy: function() {
      delete this.model;
    }
  });

  return newslettersCompView;
});
