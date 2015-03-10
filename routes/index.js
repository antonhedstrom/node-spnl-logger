var express = require('express'),
    router = express.Router();

var apiRouter = require('../api/'),
    passport = require('passport');

// Index route
router.get('/', function(req, res) {
  res.send('../public/index.html');
});

router.post('/login', passport.authenticate('local-spnl-login', {
  failureFlash: true
}), function(req, res) {
  var targetUrl = '';
  if ( req.query.url ) {
    targetUrl = req.query.url;
  }
  else {
    targetUrl = 'dashboard';
  }
  res.send({redirect: targetUrl, q: req.query});
});


router.get('/users/current', function(req, res) {
  if ( req.user ) {
    req.user.hash = undefined;
    req.user.pwd = undefined;
    res.send(req.user);
  }
  else {
    res.status(404).send({msg: 'No current user.'});
  }
});


router.use('/api', apiRouter);

module.exports = router;
