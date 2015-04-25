define([
  'app',
  'backbone',
  'marionette',
  'underscore',
  'tpl!./templates/newsletters',
  'tpl!./templates/newsletter'
], function(
  App,
  Backbone,
  Marionette,
  _,
  NewslettersTemplate,
  NewsletterTemplate
) {
  var newsletterView = Marionette.ItemView.extend({
    template: NewsletterTemplate,
    tagName: 'tr',
    templateHelpers: {
      formatDate: function(timestamp) {
        var d = new Date(timestamp);
        return d.toLocaleString('sv');
      }
    }
  });


  var newslettersCompView = Marionette.CompositeView.extend({
    template: NewslettersTemplate,
    childView: newsletterView,
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
      'sync': 'reCalc'
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
        cached: true
      };
      console.log(data);

      this.collection.add(data, {at: 0});
    }
  });

  return newslettersCompView;
});
