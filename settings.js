
module.exports = {
  env: processVar('NODE_ENV', 'ENV') || 'DEV',
  app: {
    port: processVar('PORT') || 3000,
    session: {
      secret: processVar(true, 'SESSION_SECRET'),
      cookieAge: 3600000*24*7 // 7 days
    }
  },
  db: {
    client: 'mysql',
    debug: (processVar('ENV') === 'PROD') ? false : true,
    connection: processVar(true, 'CLEARDB_DATABASE_URL', 'DB_CONN')
  },
  pbkdf2: {
    salt: processVar(true, 'SALT'),
    iterations: 7000,
    keylen: 512,
    encoding: 'hex',
    usernameField: 'username', // Not for DB, but for form fields
    passwordField: 'password' // Not for DB, but for form fields
  }
};

/* Helper function to chech for process enviroment variables */
function processVar() {
  var keys = Array.prototype.slice.call(arguments, 0),
      isRequired = false;

  if ( keys[0] === true ) {
    isRequired = true;
    keys = keys.slice(1);
  }
  for(var i=0, max=keys.length; i<max; i++) {
    if ( isDefined(process.env[keys[i]]) )  {
      return process.env[keys[i]];
    }
  }
  if ( isRequired ) {
    throw Error('Couldn\'t find required env var: ' + keys.join(' || '));
  }
  return false;
}

function isDefined(val) {
  return (val !== undefined && val !== null);
}
