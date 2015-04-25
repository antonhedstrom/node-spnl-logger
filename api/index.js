var express = require('express');

// API routers
var authHelpers = require('./helpers/auth-helpers'),
    authRouter = require('./routes/auth/'),
    usersRouter = require('./routes/users/'),
    newslettersRouter = require('./routes/newsletters/'),
    transactionsRouter = require('./routes/transactions/');

router = express.Router();

router.get('/', function(req, res) {
  res.sendFile('doc.html', {root: __dirname});
});

router.use(function(req, res, next) {
  res.type('json');
  next();
});


router.use('/auth', authRouter);
router.use('/users', authHelpers.isAuthed, usersRouter);
router.use('/newsletters', authHelpers.isAuthed, newslettersRouter);
router.use('/transactions', authHelpers.isAuthed, transactionsRouter);


module.exports = router;
