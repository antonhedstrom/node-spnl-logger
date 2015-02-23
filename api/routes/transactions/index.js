var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    errorHelpers = require('../../helpers/error-handler');


router.get('/', function(req, res) {
  var DB = req.app.get('DB');
  var limit = parseInt(req.query.limit, 10);
  var sortOrder = req.query.sort_order || 'DESC';

  DB.Transaction
    .query(function(qb) {
      if ( !_.isNaN(limit) ) {
        qb.limit(limit);
      }
      qb.orderBy('dateline', sortOrder);
    })
    .fetchAll()
    .then(function success(transactions) {
      res.send(transactions);
    }, errorHelpers.getDBFailCallback(req, res));

});

router.get('/:id', function(req, res) {
  var DB = req.app.get('DB');
  var transactionId = parseInt(req.params.id, 10);

  // isNumber returns true for NaN so both checks needed.
  if ( !_.isNumber(transactionId) || _.isNaN(transactionId) ) {
    return res.status(404).send({msg: 'Can\'t find id: ' + transactionId});
  }

  DB.Transaction
    .forge({id: transactionId})
    .fetch({require: true, withRelated: 'newsletters'})
    .then(function success(transaction) {
      res.send(transaction);
    }, errorHelpers.getDBFailCallback(req, res));
});


module.exports = router;
