define([
  'app',
  'backbone',
  'marionette',
  'underscore',

  'jquery.datetimepicker',
  'alertify',
  '../utils/utils',

  '../models/newsletter.model',
  './newsletter.itemview',
  'tpl!./templates/newsletters',
], function(
  App,
  Backbone,
  Marionette,
  _,

  DatetimePicker,
  Alertify,
  Utils,

  NewsletterModel,
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
      'change': 'reCalc',
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
        this.addNewsletter(e);
      }
    },

    addNewsletter: function(e) {
      var newsletterModel,
          newsletterPromise,
          errs,
          self = this;

      if ( e ) {
        e.preventDefault();
        e.stopPropagation();
      }
      var data = this.getFormValues();

      newsletterModel = new NewsletterModel(data);
      newsletterPromise = newsletterModel.save();

      if ( !newsletterModel.isValid() || newsletterPromise === false ) {
        errs = newsletterModel.validationError;
        if ( errs.focus in this.ui ) {
          this.ui[errs.focus].focus();
        }
        Alertify.error(errs.msg, 'error', 4);
      }
      else {
        this.collection.add(newsletterModel, {at: 0});
        newsletterPromise.done(function(data, response, options) {
          data.isLoading = false;
          newsletterModel.set(data);
          self.render();
          Alertify.success('Success!', 'success', 3);
        }).fail(function(xhr, err, msg) {
          var errors = xhr.responseJSON;
          Alertify.alert(errors.msg + '<br/>' + errors.errno + ' (' + errors.code + ')');
          self.collection.remove(newsletterModel);
          self.setFormValues(newsletterModel.toJSON());
        })
      }
    },

    onRender: function() {
      var number = this.ui.inputNumber;
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
          Utils.pad(now.getDate()) + ' ' + Utils.pad(now.getHours()) + ':' + Utils.pad(now.getMinutes())
      });

    },

    getFormValues: function() {
      return {
        number: parseInt(this.ui.inputNumber.val(), 10),
        start_time: this.ui.inputDateStart.val() + ':00',
        end_time: this.ui.inputDateEnd.val() + ':00',
        comment: this.ui.inputDesc.val(),
        isLoading: true,
        price: 10
      };
    },

    setFormValues: function(values) {
      this.ui.inputNumber.val(values.number);
      this.ui.inputDateStart.val(values.start_time.slice(0,16)); // Remove minutes
      this.ui.inputDateEnd.val(values.end_time.slice(0,16)); // Remove minutes
      this.ui.inputDesc.val(values.comment);
    },

    destroy: function() {
      delete this.model;
    }
  });

  return newslettersCompView;
});
