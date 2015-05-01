var _ = require('underscore');

var exports = {};

function filterUserData(users) {
  var result;
  if ( _.isArray(users) ) {
    result = _.map(users, function(user) {
      return filterUserData(user);
    });
  }
  else { // Only one user
    result = _.omit(users, 'hash', 'pwd');
  }
  return result;
};



module.exports = {
  filterUserData: filterUserData
};
