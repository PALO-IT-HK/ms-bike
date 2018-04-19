const Request = require('request');
const config = require('../config');

/**
 * Get London location from google place autocomplete
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getAutocomplete(req, res, next) {
  let qs;
  if (req.query.types) {
    qs = {
      input: req.query.input,
      types: req.query.types,
      components: 'country:gb',
      language: 'en',
    };
  } else {
    qs = {
      input: req.query.input,
      types: req.query.types,
      location: req.query.location,
      radius: 500,
    };
  }
  Request(
    {
      method: 'GET',
      uri: config.google_autocomplete_url,
      qs: {
        ...qs,
        key: config.google_app_key,
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return res.status(200).send(JSON.parse(body));
      }
      return next(error);
    },
  );
}

module.exports = {
  getAutocomplete,
};
