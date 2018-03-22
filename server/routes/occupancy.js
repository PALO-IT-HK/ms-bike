const express = require('express');
const router = express.Router();
const Request = require('request');
const transformer = require('./../utils/bikePointsTransformer');
const config = require('../config');

router.get('/', function(req, res, next) {
  let mockData;
  let tflURI = `${config.bike_occupancy_api_url}/${req.query.bikepoint}`;
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
        let bikePoints = [];
        let result = transformer.getBikePointOccupancy(
          JSON.parse(body),
          bikePoints
        );
        return res.status(200).send(bikePoints);
      }
    }
  );
});

module.exports = router;
