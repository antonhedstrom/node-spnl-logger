define([
  'underscore'
], function(
  _
) {
  var exports = {};

  /* Function for padding a number n width z (default 0) character until width is met */
  exports.pad = function(n, width, z) {
    z = z || '0';
    width = width || 2;
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  return exports;
});
