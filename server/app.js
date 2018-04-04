var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var healthcheck = require('./routes/healthcheck');
var allBikePoints = require('./routes/bikepoints');
var bikePointsBySearch = require('./routes/bikepoints-search');
var bikeOccupancy = require('./routes/occupancy');
var googleAutoComplete = require('./routes/google-autocomplete');
var swagger = require('./routes/swagger');

var app = express();

global.logger = require('./utils/logger');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/bike/point', allBikePoints);
app.use('/bikepoint/search', bikePointsBySearch);
app.use('/bikepoint/occupancy', bikeOccupancy);
app.use('/place/autocomplete', googleAutoComplete);
app.use('/bike/docs', swagger.router);
app.use('/bike/healthcheck', healthcheck);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
