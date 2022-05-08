var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var passport = require('passport')
var authenticate = require('./authenticate');
var config = require('./config');
var Cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
const societiesRouter = require('./routes/societiesRouter');
const eventsRouter = require('./routes/eventsRouter');
const caraouselsRouter = require('./routes/caraouselsRouter');
const membersRouter = require('./routes/memberRouter');
const questionsRouter = require('./routes/questionsRouter');
const participantsRouter = require('./routes/participantsRouter');

var app = express();


/**
 * Listen on provided port, on all network interfaces.
 */
 console.log(process.env.REACT_APP_SECRET_KEY);

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});






app.use(Cors());

app.use(passport.initialize())


const connect = mongoose.connect(config.db_url)

connect.then((db) => {
  console.log("Connected to the database")
},(err) => {
  console.log("Error in connecting to database ",err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/questions',questionsRouter)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/societies',societiesRouter);
app.use('/events',eventsRouter);
app.use('/caraousels',caraouselsRouter)
app.use('/members',membersRouter)
app.use('/participants',participantsRouter)

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
