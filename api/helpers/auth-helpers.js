
var exports = {};

// Middleware to check if user is authenticated or not.
exports.isAuthed = function(req, res, next) {
  // If user authenticated, great!
  if ( req.isAuthenticated() ) {
    return next();
  }

  // If not authenticated
  res.status(401).send({
    url: req.baseUrl,
    method: req.method,
    ip: req._remoteAddress,
    ts: req._startTime,
    msg: 'You are not authorized to access this resource.'
  });
};

module.exports = exports;
