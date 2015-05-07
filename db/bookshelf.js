var SETTINGS = require('../settings');
var knex = require('knex')(SETTINGS.db);

module.exports = function(Bookshelf) {
  Bookshelf.myInstance = Bookshelf(knex);
  return Bookshelf;
};
