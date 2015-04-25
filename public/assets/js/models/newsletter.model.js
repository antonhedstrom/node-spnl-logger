define([
  'app',
  'backbone',
  'underscore'
], function(
  App,
  Backbone,
  _
) {

  var exports = {};

  return Backbone.Model.extend({
    defaults: {
      cached: false
    },

    validate: function(attrs, options) {
      if ( !_.isNumber(attrs.number) ) {
        return {msg: 'Number needs to be a number :p'};
      }
      if ( _.isEmpty(attrs.start_time) ) {
        return {msg: 'Start time must be set'};
      }
      if ( _.isEmpty(attrs.end_time) ) {
        return {msg: 'End time must be set'};
      }
      if ( attrs.start_time > attrs.end_time ) {
        return {msg: 'End time can\'t be after start time'};
      }
      if ( _.isEmpty(attrs.comment) ) {
        return {msg: 'Comment can\'t be empty'};
      }

      // Return nothing if ok!
      return;
    }
  });

});
