var express = require('express'),
    router = express.Router(),
    mysql = require('./../../my-mysql-connection');


router.get('/', function(req, res) {
  var limit = parseInt(req.query.limit, 10) || 100;
  var payid = parseInt(req.query.payid, 10);

  mysql.query('SELECT * FROM events ' +
    'WHERE 1=1 ' +
    (payid >= 0 ? ' AND paymentid = '+payid+' ' : '') +
    'LIMIT ' + limit +
    '', function(err, events) {
    if ( err ) {
      return res.status(500).send(err);
    }

    res.send(events);
  });
});

router.get('/:id', function(req, res) {
  mysql.query('SELECT * FROM events WHERE id = ' + req.params.id, function(err, event) {
    if ( err ) {
      return res.status(500).send(err);
    }
    if ( event.length === 0 ) {
      return res.status(404).send({msg: 'Event ' + req.params.id + ' not found'});
    }

    res.send(event);
  });
});


module.exports = router;
