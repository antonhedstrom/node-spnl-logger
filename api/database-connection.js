var knexLib = require('knex'),
    bookshelfLib = require('bookshelf'),
    settings = require('../settings'),
    setupModels = require('./db/setup-models');

module.exports = {
  connect: function(cb) {
    var knex, bookshelf, models;
    try {
      knex = knexLib({
        client: 'mysql',
        debug: true,
        connection: settings.db.mysql
      });
      bookshelf = bookshelfLib(knex);
      models = setupModels(bookshelf);
    } catch (error) {
      cb(error, undefined);
    }

    cb(undefined, models);
    return this;
  }
};
