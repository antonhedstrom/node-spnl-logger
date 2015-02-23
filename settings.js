module.exports = {
  app: {
    port: 3000,
    session: {
      secret: '<insert-app-secret>',
      cookieAge: 3600000*24*7 // 7 days
    }
  },
  db: {
    mysql: {
      host: '',
      user: '',
      password: '',
      database: '',
      charset: 'utf8',
      pbkdf2: {
        salt: '<insert-password-salt>',
        iterations: 7000,
        keylen: 512,
        encoding: 'hex',
        usernameField: 'username', // Not for DB, but for form fields
        passwordField: 'password' // Not for DB, but for form fields
      }
    }
  },
};
