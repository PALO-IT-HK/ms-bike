const express = require('express');
const router = express.Router();
const Request = require('request');
const transformer = require('./../utils/bikePointsTransformer');
const config = require('../config');
const allBikePoints = require('../../mock-data/all-bike-points.json');
const bikePointsByBounds = require('../../mock-data/bike-points-by-bounds.json');
const bikePointsByRadius = require('../../mock-data/bike-points-by-radius.json');

router.get('/', function(req, res, next) {
  let mockData;
  let tflURI;
  ({ mockData, tflURI } = switchEndPoints(req, mockData, tflURI));
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
        let result = transformer.getBikePointsData(
          JSON.parse(body),
          bikePoints
        );
        return res.status(200).send(bikePoints);
      }
    }
  );
});

function switchEndPoints(req, mockData, tflURI) {
  if (
    req.query.swLat &&
    req.query.swLon &&
    req.query.neLat &&
    req.query.neLon
  ) {
    if (config.is_mock_data) {
      mockData = bikePointsByBounds;
    }
    tflURI = `${config.bike_api_url}?swLat=${req.query.swLat}&swLon=${
      req.query.swLon
    }&neLat=${req.query.neLat}&neLon=${req.query.neLon}&app_id=${
      config.app_id
    }&app_key=${config.app_key}`;
  } else if (req.query.lat && req.query.lon && req.query.radius) {
    if (config.is_mock_data) {
      mockData = bikePointsByRadius;
    }
    tflURI = `${config.bike_api_url}?lat=${req.query.lat}&lon=${
      req.query.lot
    }&radius=${req.query.radius}&app_id=${config.app_id}&app_key=${
      config.app_key
    }`;
  } else {
    if (config.is_mock_data) {
      mockData = allBikePoints;
    }
    tflURI = `${config.bike_api_url}?app_id=${config.app_id}&app_key=${
      config.app_key
    }`;
  }
  return { mockData, tflURI };
}

module.exports = router;
