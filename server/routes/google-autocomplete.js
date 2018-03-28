const express = require('express');
const router = express.Router();
const Request = require('request');
const config = require('../config');

router.get('/', function(req, res, next) {
  let mockData;
  let tflURI;
  if (req.query.types === 'geocode') {
    tflURI = `${config.google_autocomplete_url}?input=${
      req.query.input
    }&types=${req.query.types}&components=country:gb&language=en&key=${
      config.google_app_key
    }`;
  } else {
    tflURI = `${config.google_autocomplete_url}?input=${
      req.query.input
    }&types=${req.query.types}&location=${req.query.location}&radius=500&key=${
      config.google_app_key
    }`;
  }
  if (config.is_mock_data) {
    return res.status(200).send(mockData);
  }
  Request(
    {
      method: 'GET',
      uri: tflURI
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        return res.status(200).send(JSON.parse(body));
      }
    }
  );
});

module.exports = router;
