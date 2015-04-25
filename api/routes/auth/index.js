var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    passport = require('passport'),
    userHelpers = require('../../helpers/user-helpers'),
    authHelpers = require('../../helpers/auth-helpers');


router.post('/logout', authHelpers.isAuthed, function(req, res) {
  req.logout();
  res.send({
    msg: 'You are no longer authenticated.',
    loginUrl: '/login'
  });
});

// Test if user is authed or not.
router.get('/test', function(req, res) {
  console.log(req.user);
  if ( req.isAuthenticated() ) {
    res.status(200).send({
      msg: 'OK',
      timestamp: (new Date()).getTime(),
      user: userHelpers.filterUserData(req.user)
    });
  }
  else {
    res.status(401).send({
      msg: 'Not authenticated.',
      timestamp: (new Date()).getTime()
    });
  }
});


module.exports = router;
