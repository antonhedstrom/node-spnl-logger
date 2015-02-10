var express = require('express'),
    router = express.Router();

var authRoutes = require('./auth'),
    apiRouter = require('../api/');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// Index route
router.get('/', function(res, req) {
  res.send('../public/index.html');
});

router.use('/api', apiRouter);

module.exports = router;
