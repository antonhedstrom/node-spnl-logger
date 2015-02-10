var express = require('express'),
    router = express.Router(),
    mysql = require('./my-mysql-connection');

// API routers
var authRouter = require('./routes/auth/'),
    usersRouter = require('./routes/users/'),
    eventsRouter = require('./routes/events/'),
    tagsRouter = require('./routes/tags/');


router.get('/', function(req, res) {
  res.sendFile('doc.html', {root: __dirname});
});

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/tags', tagsRouter);

module.exports = router;
