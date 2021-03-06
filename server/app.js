const express = require('express');
const path = require('path');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const healthcheck = require('./routes/healthcheck');
const allBikePoints = require('./routes/bikepoints');
const bikePointsBySearch = require('./routes/bikepoints-search');
const bikeOccupancy = require('./routes/occupancy');
const googleAutoComplete = require('./routes/google-autocomplete');
const swagger = require('./routes/swagger');

const app = express();

global.logger = require('./utils/logger');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use('/bike/point', allBikePoints);
app.use('/bike/docs', swagger.router);
app.use('/bike/healthcheck', healthcheck);
app.use('/bikepoint/point', allBikePoints);
app.use('/bikepoint/search', bikePointsBySearch);
app.use('/bikepoint/occupancy', bikeOccupancy);
app.use('/place/autocomplete', googleAutoComplete);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500).json('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500).json('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
