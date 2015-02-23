module.exports = {

  // Return a callback
  getDBFailCallback: function (req, res) {
    return function fail(err) {
      var statusCode;
      switch (err.message) {
        case 'EmptyResponse':
          statusCode = 404;
          break;
        default:
          statusCode = 500;
      }
      res.status(404).send(err);
    };
  }
};
