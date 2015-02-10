var express = require('express'),
    router = express.Router(),
    mysql = require('./../../my-mysql-connection'),
    find = require('array.prototype.find');

router.get('/', function(req, res) {
  mysql.query('SELECT * FROM user', function(err, users) {
    if ( err ) {
      return res.status(500).send(err);
    }

    users.forEach(function(user) {
      user.pwd = undefined;
    });

    res.send(users);
  });
});

router.post('/', function(req, res) {
  var user = {
    name: req.body.name,
    id: id++
  };
  users.push(user);

  res.send(user);
});

router.put('/:id', function(req, res) {
  var id = parseInt(req.params.id, 10);
  var user = users.find(function(user) {
    return id === user.id;
  });

  if ( user && req.body.name) {
    user.name = req.body.name;
    res.send(user);
  }
  else {
    res.status(404).send({msg: 'User not found.'});
  }

});



module.exports = router;
