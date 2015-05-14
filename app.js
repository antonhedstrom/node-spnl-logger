/**
 * Module dependencies.
 */

// https://github.com/motdotla/dotenv
require('dotenv').load();

var express = require('express'),
    http = require('http'),
    path = require('path'),
    multer = require('multer'),
    colors = require('colors'),
    passport = require('passport'),
    connectFlash = require('connect-flash'),

    // https://github.com/senchalabs/connect#middleware
    // Official support from Express team:
    morgan  = require('morgan'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),

    // Local files:
    SETTINGS = require('./settings'),
    Bookshelf = require('bookshelf'),
    bookshelf = require('./db/bookshelf')(Bookshelf),
    localPassportStrategies = require('./db/passport-strategies'),
    routes = require('./routes/');


// http://stackoverflow.com/a/21103523
var app = module.exports = express();

// all environments
app.set('port', SETTINGS.app.port || 3000);
app.set('views', './views');
app.set('view engine', 'ejs');

// Serve up public/ftp folder
app.use(serveStatic('public', {'index': ['index.html']}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());

app.use(session({
  secret: SETTINGS.app.session.secret,
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: SETTINGS.app.session.cookieAge
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

// Logger:
app.use(
  morgan('dev', {
    skip: function (req, res) {
      return false; // res.statusCode < 400;
    }
  })
);

// Server side routes
app.use(routes);

app.set('bookshelf', bookshelf.myInstance);
localPassportStrategies();

// Start app!
http.createServer(app).listen(app.get('port'), function(){
  console.log(('Express server (env='+process.env.ENV+') listening on port ' + app.get('port')).green);
});

module.exports = app;
