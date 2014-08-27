var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})
// define the home page route
router.get('/', function(req, res) {
  res.send('../public/index.html');
})

module.exports = router;
