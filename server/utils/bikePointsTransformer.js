const _ = require('lodash');
const rp = require('request');
const config = require('../config');

function getBikePointsData(tflBikeData, bikeData) {
  if (Array.isArray(tflBikeData)) {
    return tflBikeData.map(item => {
      if (item.placeType === 'BikePoint') {
        var point = {};
        point.commonName = item.commonName;
        point.id = item.id;
        point.TerminalName = item.additionalProperties[0].value;
        point.modifiedDate = item.additionalProperties[0].modified;
        point.NbBikes = item.additionalProperties[6].value;
        point.NbEmptyDocks = item.additionalProperties[7].value;
        point.NbDocks = item.additionalProperties[8].value;
        point.lat = item.lat;
        point.lon = item.lon;
        bikeData.push(point);
      }
    });
    return bikeData;
  }
}

function getBikePointsDataBySearch(tflSearchBikeData, bikeData) {
  if (Array.isArray(tflSearchBikeData)) {
    return tflSearchBikeData.map(item => {
      if (item.placeType === 'BikePoint') {
        var point = {};
        point.commonName = item.commonName;
        point.id = item.id;
        point.lat = item.lat;
        point.lon = item.lon;
        bikeData.push(point);
      }
    });
    return bikeData;
  }
}

function getBikePointOccupancy(tflOccupancyBikeData, bikeData) {
  if (Array.isArray(tflOccupancyBikeData)) {
    return tflOccupancyBikeData.map(item => {
      var point = {};
      point.id = item.id;
      point.name = item.name;
      point.bikesCount = item.bikesCount;
      point.emptyDocks = item.emptyDocks;
      point.totalDocks = item.totalDocks;
      bikeData.push(point);
    });
    return bikeData;
  }
}

module.exports = {
  getBikePointsData,
  getBikePointsDataBySearch,
  getBikePointOccupancy
};
