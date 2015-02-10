var express = require('express'),
    router = express.Router(),
    mysql = require('./../../my-mysql-connection'),
    find = require('array.prototype.find');


router.get('/', function(req, res) {
  mysql.query('SELECT * FROM tags', function(err, tags) {
    if ( err ) {
      return res.status(500).send(err);
    }

    res.send(tags);
  });
});


module.exports = router;
