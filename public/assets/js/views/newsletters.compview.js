define([
  'app',
  'backbone',
  'marionette',
  'underscore',

  'jquery.datetimepicker',
  '../utils/utils',

  './newsletter.itemview',
  'tpl!./templates/newsletters',
], function(
  App,
  Backbone,
  Marionette,
  _,

  DatetimePicker,
  Utils,

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
      //'add': 'reCalc', // https://github.com/marionettejs/backbone.marionette/issues/640
      'remove': 'reCalc'
    },

    templateHelpers: {
      formatSum: function(sum) {
        return parseFloat(sum.toFixed(2)).toLocaleString('sv');
      }
    },

    reCalc: function() {
      var sum = _.reduce(this.collection.models, function(memo, model) {
        var price = model.get('price');
        return memo + (_.isNumber(price) ? price : 0);
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

    addNewsletter: function(e) {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Spara
      var data = {
        number: this.ui.inputNumber.val(),
        start_time: this.ui.inputDateStart.val(),
        end_time: this.ui.inputDateEnd.val(),
        comment: this.ui.inputDesc.val(),
        cached: true
      };
      console.log(data);

      this.collection.add(data, {at: 0});
    },

    onRender: function() {
      var number = this.ui.inputNumber;
      var dateStart = this.ui.inputDateStart;
      var dateEnd = this.ui.inputDateEnd;
      var latest = this.collection.at(0);
      var now = new Date();

      // Set default values
      if ( _.isEmpty(number.val()) && latest ) {
        number.val(parseInt(latest.get('number'), 10) + 1);
      }

      // Initialize datetimepickers
      this.$el.find('.date > input').datetimepicker({
        lang: 'en',
        format: 'Y-m-d H:i',
        value: now.getFullYear() + '-' + Utils.pad((now.getMonth()+1)) + '-' +
          now.getDate() + ' ' + now.getHours() + ':' + '00'
      });

    },

    destroy: function() {
      delete this.model;
    }
  });

  return newslettersCompView;
});
