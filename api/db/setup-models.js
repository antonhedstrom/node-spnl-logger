/*
  Setup all required models using bookshelf.
*/
module.exports = function (bookshelf) {

  return {
    User: require('./models/user-model')(bookshelf),
    Newsletter: require('./models/newsletter-model')(bookshelf),
    Transaction: require('./models/transaction-model')(bookshelf),
  };
};
