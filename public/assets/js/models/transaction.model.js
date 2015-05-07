define([
  'app',
  'backbone'
], function(
  App,

  Backbone
) {

  // I.E. 2015-05-03
  var mysqlDatelineRegexp = /^([1-3][0-9]{3,3})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

  var TransactionModel = Backbone.Model.extend({
    urlRoot: '/api/transactions/',
    defaults: {
      isLoading: false,
      isRecentlyAdded: false
    },

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
      if ( !mysqlDatelineRegexp.test(attrs.dateline) ) {
        return {focus: 'inputDateline', msg: 'Invalid payment date.<br/>' + attrs.dateline};
      }
      if ( isNaN(attrs.amount) ) {
        return {focus: 'inputAmount', msg: 'Amount needs to be a number.'};
      }

      // Return nothing if ok!
      return;
    }
  });

  return TransactionModel;

});
