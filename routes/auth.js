var express = require('express');
var router = express.Router();


// define the home page route
module.exports = {
  index: function(req, res) {
    res.send('Login home page');
  }
};
