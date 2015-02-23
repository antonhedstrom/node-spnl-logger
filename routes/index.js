var express = require('express'),
    router = express.Router();

var authRoutes = require('./auth'),
    apiRouter = require('../api/'),
    passport = require('passport');

// Index route
router.get('/', function(res, req) {
  res.send('../public/index.html');
});

router.post('/login', passport.authenticate('local-spnl-login', {
  failureFlash: true
}), function(req, res) {
  console.log("REQ.USER", req.user);

  res.redirect('/');
});


router.get('/users/current', function(req, res) {
  console.log("CURRENT USER:", req.user);
  res.send({name: "test", data: req.user});
});


router.use('/api', apiRouter);

module.exports = router;
