var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    utils = require('../../helpers/utils');
    errorHelpers = require('../../helpers/error-handler');

var tsRegexp = /\d{10}/;

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
  var sortField = req.query.sortfield || 'dateline';
  var sortOrder = req.query.sortorder || 'DESC';

  var constraints = {
    where: {},
    orderBy: {}
  };

  if ( tsRegexp.test(from) ) {
    constraints.where.from = new Date(from.match(tsRegexp)[0] * 1000);
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
  }
  else if ( isPaid.toLowerCase() === 'n' ) {
    constraints.where.isPaid = false;
  }

  /* isNumber returns true for NaN, therefore both checks needed */
  if ( _.isNumber(payid) && !_.isNaN(payid) ) {
    constraints.where.paymentid = payid;
  }

  /* Special order? */
  if ( _.isString(sortField) ) {
    constraints.orderBy.field = sortField;
  }
  if ( sortOrder === 'ASC' || sortOrder === 'DESC' ) {
    constraints.orderBy.order = sortOrder;
  }

  DB.Newsletter
    .query(function(qb) {
      var where = constraints.where,
          comparator;
      if ( constraints.where.from ) {
        qb.where('start_time', '>=', utils.datelineDBFormatter(constraints.where.from));
      }
      if ( constraints.where.to ) {
        qb.where('end_time', '<=', utils.datelineDBFormatter(constraints.where.to));
      }
      if ( constraints.limit ) {
        qb.limit(constraints.limit);
      }
      if ( constraints.where.paymentid ) {
        qb.where('paymentid', '=', constraints.where.paymentid);
      }
      if ( _.isBoolean(constraints.where.isPaid) ) {
        comparator = constraints.where.isPaid ? '!=' : '=';
        qb.where('paymentid', comparator, '0');
      }
      if ( constraints.orderBy ) {
        qb.orderBy(constraints.orderBy.field, constraints.orderBy.order);
      }

      // Never fetch 'deleted' ones
      qb.where({deleted: 0});
     })
    .fetchAll()
    .then(function(newsletters) {
      res.send(newsletters);
    }, errorHelpers.getDBFailCallback(req, res));

});

// Create a new
router.post('/', function(req, res) {
  var DB = req.app.get('DB');
  var data = _.extend(req.body, {
    paymentid: 0,
    dateline: utils.datelineDBFormatter(new Date())
  });
  new DB.Newsletter(data).save().then(function(model) {
    res.send(model);
  }, function(err) {
    console.log(('' + err).red );
    var clientErr = {
      'msg': 'Couldn\'t save newsletter.',
      data: data,
      errno: err.errno
    };
    switch (err.code) {
      case 'ER_DUP_ENTRY':
        clientErr.code = err.code;
        break;
      default:
        clientErr.code = 'SRV_ERR';
    }
    res.status(500).send(clientErr);
  });
});


// Get a specific newsletter
router.get('/:id', function(req, res) {
  var DB = req.app.get('DB');
  var newsletterId = parseInt(req.params.id, 10);

  // isNumber returns true for NaN so both checks needed.
  if ( !_.isNumber(newsletterId) || _.isNaN(newsletterId) ) {
    return res.status(404).send({msg: 'Required parameter id missing. Got: (' + newsletterId + ').'});
  }

  DB.Newsletter
    .forge({id: newsletterId, deleted: 0})
    .fetch({require: true})
    .then(function(newsletter) {
      if ( _.isEmpty(newsletter) ) {
        res.status(404).send({msg: 'Can\'t find id: ' + newsletterId});
      }
      else {
        res.send(newsletter);
      }
    }, errorHelpers.getDBFailCallback(req, res));
});


// 'Delete' existing. Actually updates the 'deleted' attribute.
router.delete('/:id', function(req, res) {
  var DB = req.app.get('DB');
  var newsletterId = parseInt(req.params.id, 10);

  // isNumber returns true for NaN so both checks needed.
  if ( !_.isNumber(newsletterId) || _.isNaN(newsletterId) ) {
    return res.status(404).send({msg: 'Required parameter id missing. Got: (' + newsletterId + ').'});
  }

  DB.Newsletter
    .forge({id: newsletterId, deleted: 0})
    .fetch({require: true})
    .then(function(newsletter) {
      newsletter.save({
        deleted: true
      }).then(function() {
        res.send({msg: 'Deleted!', newsletter: newsletter});
      }, errorHelpers.getDBFailCallback(req, res))
    }, errorHelpers.getDBFailCallback(req, res));

});




module.exports = router;
