

// Function for padding a number n width z (default 0) character until width is met
function pad(n, width, z) {
  z = z || '0';
  width = width || 2;
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// Format a javascript date into a mysql dateline format
function datelineDBFormatter(d) {
  if ( !(d instanceof Date) ) {
    return d;
  }
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) ;
}


module.exports = {
  pad: pad,
  datelineDBFormatter: datelineDBFormatter
};
