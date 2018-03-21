const express = require('express');
const router = express.Router();
const Request = require('request');
const transformer = require('./../utils/bikePointsTransformer');
/* GET users listing. */
router.get('/', function(req, res, next) {
  Request(
    {
      method: 'GET',
      uri:
        'https://api.tfl.gov.uk/BikePoint?app_id=5ebfd576&app_id=5ebfd576&app_key=019b1eb8b5ddd58804fe1cb884ce009b'
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
