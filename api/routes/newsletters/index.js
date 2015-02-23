var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    errorHelpers = require('../../helpers/error-handler');

var tsRegexp = /\d{10}/;
var dateCompareFormatter = function(d) {
  return d.getFullYear() + pad(d.getMonth()) + pad(d.getDate());
};
function pad(n, width, z) {
  z = z || '0';
  width = width || 2;
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/* ROUTES:
*    /api/newsletters/
*    /api/newsletters/?is_paid=true
*    /api/newsletters/?is_paid=false
*    /api/newsletters/123
*/

// Get all newsletters (with filtering)
router.get('/', function(req, res) {
  var DB = req.app.get('DB');

  // Filter options
  var from = req.query.from;
  var to = req.query.to;
  var isPaid = req.query.is_paid || '';
  var limit = parseInt(req.query.limit, 10);
  var payid = parseInt(req.query.payid, 10);

  var constraints = {
    where: {}
  };

  if ( tsRegexp.test(from) ) {
    constraints.where.from = new Date(from.match(tsRegexp)[0] * 1000);
    console.log(constraints.where.from);
  }

  if ( tsRegexp.test(to) ) {
    constraints.where.to = new Date(to.match(tsRegexp)[0] * 1000);
  }

  /* isNumber returns true for NaN, therefore both checks needed */
  if ( _.isNumber(limit) && !_.isNaN(limit) ) {
    constraints.limit = limit;
  }

  /* Only filter when explicit set to 'n' or 'y'. */
  if ( isPaid.toLowerCase() === 'y' ) {
    constraints.where.isPaid = true;
    console.log("isPaid", "TRUUEEE");
  }
  else if ( isPaid.toLowerCase() === 'n' ) {
    constraints.where.isPaid = false;
    console.log("isPaid", "FAAALSE");
  }

  /* isNumber returns true for NaN, therefore both checks needed */
  if ( _.isNumber(payid) && !_.isNaN(payid) ) {
    constraints.where.paymentid = payid;
  }

  DB.Newsletter
    .query(function(qb) {
      var where = constraints.where,
          comparator;
      if ( constraints.where.from ) {
        qb.where('start_time', '>=', dateCompareFormatter(constraints.where.from));
      }
      if ( constraints.where.to ) {
        qb.where('end_time', '<=', dateCompareFormatter(constraints.where.to));
      }
      if ( constraints.limit ) {
        qb.limit(constraints.limit);
      }
      if ( where.paymentid ) {
        qb.where('paymentid', '=', where.paymentid);
      }
      if ( _.isBoolean(where.isPaid) ) {
        comparator = where.isPaid ? '!=' : '=';
        qb.where('paymentid', comparator, '0');
      }
     })
    .fetchAll()
    .then(function(newsletters) {
      res.send(newsletters);
    }, errorHelpers.getDBFailCallback(req, res));

});


// Get a specific newsletter
router.get('/:id', function(req, res) {
  var DB = req.app.get('DB');
  var newsletterId = parseInt(req.params.id, 10);

  // isNumber returns true for NaN so both checks needed.
  if ( !_.isNumber(newsletterId) || _.isNaN(newsletterId) ) {
    return res.status(404).send({msg: 'Can\'t find id: ' + newsletterId});
  }

  DB.Newsletter
    .forge({id: newsletterId})
    .fetch()
    .then(function(newsletter) {
      if ( _.isEmpty(newsletter) ) {
        res.status(404).send({msg: 'Can\'t find id: ' + newsletterId});
      }
      else {
        res.send(newsletter);
      }
    }, errorHelpers.getDBFailCallback(req, res));
});


module.exports = router;
