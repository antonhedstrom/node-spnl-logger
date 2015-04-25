var express = require('express');
var apiRouter = require('../api/');
var passport = require('passport');

router = express.Router();

var loginRoute = '/login';

// All API routes
router.use('/api', apiRouter);

// Login routes
router.get(loginRoute, function(req, res) {
  res.render('login.ejs', {
    flashMessages: req.flash('error')
  });
});

router.post(loginRoute, passport.authenticate('local-spnl-login', {
  successRedirect: '/',
  failureRedirect: loginRoute,
  failureFlash: true
}), function(req, res) {
  res.render('index.ejs');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect(loginRoute);
});

// Index route
router.get('/', isAuthed, function(req, res) {
  res.render('index.ejs');
});


function isAuthed(req, res, next) {
  console.log(req.params, req.query);
  if ( req.isAuthenticated() ) {
    return next();
  }
  res.redirect(loginRoute);
}


module.exports = router;
