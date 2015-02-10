var mysql = require('mysql'),
    settings = require('../settings');

var connection = mysql.createConnection({
  host     : settings.db.mysql.host,
  user     : settings.db.mysql.user,
  password : settings.db.mysql.password,
  database : settings.db.mysql.database
});

connection.connect(function(err) {
  if ( err ) {
    return console.log(('Error connecting to mysql://' + settings.db.mysql.localhost).red, err);
  }
  console.log(('Success connecting to ' + connection.config.host +':'+ connection.config.port).green);
});

module.exports = connection;
