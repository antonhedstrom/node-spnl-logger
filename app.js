/**
 * Module dependencies.
 */

var express = require('express'),
    indexRoutes = require('./routes/index'),
    userRoutes = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    morgan  = require('morgan'),
    serveStatic = require('serve-static');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', process.cwd() + '/views');
app.set('view engine', 'jade');

// Serve up public/ftp folder
app.use(serveStatic('public', {'index': ['index.html']}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(multer({ dest: './uploads/'}));

// Logger:
app.use(
  morgan('combined', {
    skip: function (req, res) {
      return res.statusCode < 400;
    }
  })
);



app.use('/', indexRoutes);
app.use('/users', userRoutes);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
