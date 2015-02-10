var express = require('express'),
    router = express.Router(),
    mysql = require('./../../my-mysql-connection'),
    settings = require('./../../../settings'),
    md5 = require('MD5'),
    find = require('array.prototype.find');


router.post('/login', function(req, res) {
  var user = req.body.user;
  var pass = req.body.pass;

  if ( user && pass ) {
    mysql.query('SELECT * FROM user WHERE LOWER(name)=LOWER("'+user+'") AND pwd="'+md5(pass+settings.db.mysql.salt)+'"', function(err, user) {
      if ( err ) {
        return res.status(401).send({msg: 'Incorrect user/pass.', err: err});
      }
      if ( user.length === 0 ) {
        return res.status(401).send({msg: 'Incorrect user/pass.'});
      }
      // TODO: Create session
      user[0].pwd = undefined;
      res.send(user);
    });
  }
  else {
    return res.send({msg: 'Both user and pass are required.'});
  }
});


module.exports = router;
