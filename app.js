const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const initRoutes = require('./routes/routes');
const initScheduleTask = require('./schedule');
const { execSql } = require('./db/mysql');
const redisClient = require('./db/redis');

const devMode = process.env.NODE_ENV === 'development';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if(devMode) {
    app.use(morgan('dev'));
}
else {
    const logFileName = path.join(__dirname, './logs', 'access.log');
    const accessLogStream  = fs.createWriteStream(logFileName, {
        flags: 'a'
    });
    app.use(morgan('combined', {
        stream: accessLogStream 
    }))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionStore = new RedisStore({
    client: redisClient
});

app.use(session({
    secret: 'V9dsk_@lq',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
}));

initRoutes(app);
// initScheduleTask();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
