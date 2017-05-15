var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
const authAPI = require('./middleware/authAPI')
const mlab_user = process.env.MLAB_USER;
const mlab_user = process.env.MLAB_PASS;


var mongoose = require('mongoose');

var app = express();

var jwt = require('jsonwebtoken');

// create new token
// var token = jwt.sign({email: 'thompson.h@gmail.com' }, 'secretcode');
// console.log(token);

// database is called recipes
// could inclucde the default port for mongodb: 'mongodb://localhost:27107/recipes'
mongoose.connect(`mongodb://${mlab_user}:${mlab_pass}@ds033046.mlab.com:33046/recipe_api`)
const { connection: db} = mongoose;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to recipe database')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/*', authAPI)
app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
