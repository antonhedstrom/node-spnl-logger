# node-spnl-logger

A time tracker I am using for another project. Fairly specific to my needs.

Written using:

* Client framework: [Backbone](http://backbonejs.org/) + [Marionette](http://marionettejs.com/)
* UI: [Drunken Parrot](http://hoarrd.github.io/drunken-parrot-flat-ui/)
* Server: [Node](https://nodejs.org/) + [Express](http://expressjs.com/)
* Authentication: [Passport](http://passportjs.org/)
* ORM: [Bookshelf](http://bookshelfjs.org/)
* DB: [MySQL](https://www.mysql.com/)

## Install

The App needs some enviroment variables to be set:
```
ENV=DEV
NODE_ENV=$ENV
SESSION_SECRET=<my-session-secret>
DB_CONN=<my-database-connection-string>
SALT=<my-password-salt>
```
Preferably you can set thoose in the .env file in project root.


### Database
TODO: Fix DB setup.

### Application

Install dependencies and build app:
```
npm install
grunt
```

Start application:
```
pm2 processes
```
or
```
npm start
```
