var express = require('express'),
    router = express.Router();


router.get('/', function(req, res) {
  var DB = req.app.get('DB');
  DB.User.fetchAll().then(function(users) {
    res.send(users);
  });
});

router.post('/', function(req, res) {
  console.log('Not implemented yet');
  res.send('Not implemented yet');
});

router.put('/:id', function(req, res) {
  console.log('Not implemented yet');
  res.send('Not implemented yet');
});

module.exports = router;
