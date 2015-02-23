var express = require('express'),
    router = express.Router();

// API routers
var usersRouter = require('./routes/users/'),
    newslettersRouter = require('./routes/newsletters/'),
    transactionsRouter = require('./routes/transactions/');

router.get('/', function(req, res) {
  res.sendFile('doc.html', {root: __dirname});
});

router.use(function(req, res, next) {
  res.type('json');
  next();
});

router.use('/users', usersRouter);
router.use('/newsletters', newslettersRouter);
router.use('/transactions', transactionsRouter);

module.exports = router;
