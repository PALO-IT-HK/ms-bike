const express = require('express');
const router = express.Router();
const Request = require('request');
const transformer = require('./../utils/bikePointsTransformer');
const config = require('../config');

router.get('/', function(req, res, next) {
  Request(
    {
      method: 'GET',
      uri: `${config.bike_api_url}?app_id=${config.app_id}&app_key=${
        config.app_key
      }`
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let bikePoints = [];
        let result = transformer.getBikePointsData(
          JSON.parse(body),
          bikePoints
        );
        return res.status(200).send(bikePoints);
      }
    }
  );
});

module.exports = router;
