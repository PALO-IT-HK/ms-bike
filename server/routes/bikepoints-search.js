const express = require('express');
const router = express.Router();
const Request = require('request');
const transformer = require('./../utils/bikePointsTransformer');
const config = require('../config');

/**
 * @swagger
 * /bikepoint/search:
 *   get:
 *     description: Search for bike point
 *     tags:
 *       - bike
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: stocks
 *         schema:
 *           $ref: '#/definitions/Stocks'
 */
router.get('/', function(req, res, next) {
  let mockData;
  let tflURI = `${config.bike_search_api_url}?query=${req.query.query}&app_id=${
    config.app_id
  }&app_key=${config.bike_app_key}`;
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
        let result = transformer.getBikePointsDataBySearch(
          JSON.parse(body),
          bikePoints
        );
        return res.status(200).send(bikePoints);
      }
    }
  );
});

module.exports = router;
