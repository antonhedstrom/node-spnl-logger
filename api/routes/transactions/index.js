var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    errorHelpers = require('../../helpers/error-handler'),
    Utils = require('../../helpers/utils'),
    Transaction = require('../../../db/models/transaction-model');


// Get all
router.get('/', function(req, res) {
  var limit = parseInt(req.query.limit, 10);
  var sortOrder = req.query.sort_order || 'DESC';

  Transaction
    .query(function(qb) {
      if ( !_.isNaN(limit) ) {
        qb.limit(limit);
      }
      qb.orderBy('dateline', sortOrder);

      // Never fetch 'deleted' ones
      qb.where({deleted: 0});
    })
    .fetchAll()
    .then(function success(transactions) {
      res.send(transactions);
    }, errorHelpers.getDBFailCallback(req, res));

});

// Get one
router.get('/:id', function(req, res) {
  var transactionId = parseInt(req.params.id, 10);

  // isNumber returns true for NaN so both checks needed.
  if ( !_.isNumber(transactionId) || _.isNaN(transactionId) ) {
    return res.status(404).send({msg: 'Can\'t find id: ' + transactionId});
  }

  Transaction
    .forge({id: transactionId})
    .fetch({require: true, withRelated: 'newsletters'})
    .then(function success(transaction) {
      res.send(transaction);
    }, errorHelpers.getDBFailCallback(req, res));
});

// Create a new
router.post('/', function(req, res) {
  var data = req.body;

  var transaction = new Transaction(data);
  transaction.save().then(function(model) {
    res.send(model);
  }, function(err) {
    console.log(('' + err).red );
    var clientErr = {
      'msg': 'Couldn\'t save payment.',
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


// 'Delete' existing. Actually updates the 'deleted' attribute.
router.delete('/:id', function(req, res) {
  var transactionId = parseInt(req.params.id, 10);

  // isNumber returns true for NaN so both checks needed.
  if ( !_.isNumber(transactionId) || _.isNaN(transactionId) ) {
    return res.status(404).send({
      msg: 'Required parameter id missing. Got: (' + transactionId + ').'
    });
  }

  Transaction
    .forge({id: transactionId})
    .fetch({require: true})
    .then(function(transaction) {
      if ( transaction.deleted ) {
        return res.send({msg: 'Already deleted.'});
      }
      transaction.save({
        deleted: true,
        deletedAt: Utils.datelineDBFormatter(new Date())
      }).then(function() {
        res.send({msg: 'Deleted!', transaction: transaction});
      }, errorHelpers.getDBFailCallback(req, res));
    }, errorHelpers.getDBFailCallback(req, res));

});

module.exports = router;
