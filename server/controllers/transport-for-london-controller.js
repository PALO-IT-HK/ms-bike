const Request = require('request');
const config = require('../config');
const transformer = require('./../utils/bike-points-transformer');

/**
 * Get bikepoints by boundary, radius, or all bikepoints
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getBikepoints(req, res, next) {
  Request(
    {
      method: 'GET',
      uri: config.bike_api_url,
      qs: {
        ...req.query,
        app_id: config.app_id,
        app_key: config.bike_app_key,
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = transformer.getBikePointsData(JSON.parse(body));
        if (result) {
          return res.status(200).send(result);
        }
      }
      return next(error);
    },
  );
}

/**
 * Search bikepoints by name
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function searchBikepoints(req, res, next) {
  return Request(
    {
      method: 'GET',
      uri: config.bike_search_api_url,
      qs: {
        query: req.query.query,
        app_id: config.app_id,
        app_key: config.bike_app_key,
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = transformer.getBikePointsDataBySearch(JSON.parse(body));
        if (result) {
          return res.status(200).send(result);
        }
      }
      return next(error);
    },
  );
}

/**
 * Get bikepoint occupancy by Id
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getOccupancy(req, res, next) {
  Request(
    {
      method: 'GET',
      uri: `${config.bike_occupancy_api_url}/${req.query.bikepoint}`,
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = transformer.getBikePointOccupancy(JSON.parse(body));
        return res.status(200).send(result);
      }
      return next(error);
    },
  );
}

module.exports = {
  searchBikepoints,
  getBikepoints,
  getOccupancy,
};
