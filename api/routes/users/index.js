var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    userHelpers = require('../../helpers/user-helpers');


router.get('/', function(req, res) {
  var DB = req.app.get('DB');
  DB.User.fetchAll().then(function(users) {
    res.send(userHelpers.filterUserData(users));
  });
});

router.get('/me', function(req, res) {
  if ( req.user ) {
    res.send(userHelpers.filterUserData(req.user));
  }
  else {
    res.status(404).send({msg: 'User not found.'});
  }

});

router.get('/:id', function(req, res) {
  var DB = req.app.get('DB');
  var userId = req.params.id;
  var regDigits = /^\d+$/;
  var userFilter = {};
  if ( regDigits.test(userId) ) {
    userFilter = {id: parseInt(userId)};
  }
  else {
    userFilter = {username: userId};
  }

  DB.User.forge(userFilter).fetch({
    require: true,
    limit: 1
  }).then(function (user) {
    res.send(userHelpers.filterUserData(user));
  }).catch(function (err) {
    res.status(404).send(err);
  });
});

router.post('/', function(req, res) {
  console.log('Not implemented yet');
  res.send({msg: 'Not implemented yet'});
});

router.put('/:id', function(req, res) {
  console.log('Not implemented yet');
  res.send({msg: 'Not implemented yet'});
});

module.exports = router;
