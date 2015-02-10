/**
 * Module dependencies.
 */

var express = require('express'),
    settings = require('./settings'),
    routes = require('./routes/'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    morgan  = require('morgan'),
    serveStatic = require('serve-static'),
    mongoose = require('mongoose'),
    colors = require('colors');


// MONGODB
/* Not used at the moment

mongoose.connect('mongodb://'+settings.db.mongo.url+'/'+settings.db.mongo.name);
var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'connection error:'.red));
mongodb.once('open', function callback () {
  console.log(('Successfully connected to mongodb://' + settings.db.mongo.url).green);
});
*/

var app = express();

// all environments
app.set('port', process.env.PORT || settings.app.port || 3000);
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

app.use(routes);

http.createServer(app).listen(app.get('port'), function(){
  console.log(('Express server listening on port ' + app.get('port')).green);
});
