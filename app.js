/**
 * Module dependencies.
 */

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
    settings = require('./settings'),
    db = require('./api/database-connection'),
    routes = require('./routes/');


var app = express();

// Wrapping config stuff in an IIFE
(function configure() {
  // all environments
  app.set('port', process.env.PORT || settings.app.port || 3000);
  app.set('views', process.cwd() + '/views');
  app.set('view engine', 'jade');

  // Serve up public/ftp folder
  app.use(serveStatic('public', {'index': ['index.html']}));

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());
  app.use(connectFlash());

  app.use(session({
    secret: settings.app.session.secret,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: settings.app.session.cookieAge
    }
  }));
  // parse application/json
  app.use(multer({ dest: './uploads/'}));

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Logger:
  app.use(
    morgan('dev', {
      skip: function (req, res) {
        return false; // res.statusCode < 400;
      }
    })
  );

  app.use(routes);
})();

// Connect to database
db.connect(function(err, DB) {
  if (err) {
    console.log('Couldn\'t connect to database:'.red, err);
  }
  else {
    console.log('Connected to database. Maybe.'.green);
    app.set('DB', DB);

    DB.User.createStrategies(passport);

    // Start app!
    http.createServer(app).listen(app.get('port'), function(){
      console.log(('Express server listening on port ' + app.get('port')).green);
    });
  }
});

module.exports = app;
