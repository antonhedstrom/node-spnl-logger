var Knex = require('knex'),
    Bookshelf = require('bookshelf'),
    SETTINGS = require('../settings');


module.exports = function(cb) {
  var knex, bookshelf, models;

  try {
    knex = Knex(SETTINGS.db);
    // Test connection ()
    knex.raw('select 1+1 as result').then(function(data) {
      // there is a valid connection in the pool
      console.log('Result is', data[0][0].result);
      bookshelf = Bookshelf(knex);
      cb(null, bookshelf); // Everything OK!
    }, function(error) {
      cb(error, undefined);
    });
  } catch (error) {
    cb(error, undefined);
  }

  return {
    knex: knex,
    bookshelf: bookshelf
  };
};
