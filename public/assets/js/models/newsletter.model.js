define([
  'app',
  'backbone',
  'underscore'
], function(
  App,
  Backbone,
  _
) {

  // I.E. 2015-05-01 02:21:00
  var mysqlDatelineRegexp = /^([1-3][0-9]{3,3})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])$/;

  var NewsletterBaseModel = Backbone.Model.extend({
    defaults: {
      isLoading: false,
      isRecentlyAdded: false,
      price: 0
    },

    urlRoot: '/api/newsletters',

    // Override default save to control what is being sent to server.
    save: function (attrs, options) {
      attrs = attrs || this.toJSON();
      options = options || {};

      attrs = _.omit(attrs, _.keys(this.defaults));

      // Move attrs to options and call native save.
      options.attrs = attrs;
      return Backbone.Model.prototype.save.call(this, attrs, options);
    },

    validate: function(attrs, options) {
      if ( isNaN(attrs.number) ) {
        return {focus: 'inputNumber', msg: 'Number needs to be a number. Got ' + attrs.number + '.'};
      }
      if ( !mysqlDatelineRegexp.test(attrs.start_time) ) {
        return {focus: 'inputDateStart', msg: 'Invalid start date/time.<br/>' + attrs.start_time};
      }
      if ( !mysqlDatelineRegexp.test(attrs.end_time) ) {
        return {focus: 'inputDateEnd', msg: 'Invalid end date/time.<br/>' + attrs.end_time};
      }
      if ( attrs.start_time > attrs.end_time ) {
        return {focus: 'inputDateEnd', msg: 'End time can\'t be after start time.'};
      }
      if ( _.isEmpty(attrs.comment) ) {
        return {focus: 'inputDesc', msg: 'Comment can\'t be empty.'};
      }

      // Return nothing if ok!
      return;
    }
  });

  return NewsletterBaseModel;

});
