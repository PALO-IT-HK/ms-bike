const _ = require('lodash');

function getBikePointsData(tflBikeData, bikeData) {
  if (Array.isArray(tflBikeData)) {
    return tflBikeData.map(item => {
      if (item.placeType === 'BikePoint') {
        var point = {};
        point.commonName = item.commonName;
        point.TerminalName = item.additionalProperties[0].value;
        point.Installed = item.additionalProperties[1].value;
        point.Locked = item.additionalProperties[2].value;
        point.InstallDate = item.additionalProperties[3].value;
        point.RemovalDate = item.additionalProperties[4].value;
        point.Temporary = item.additionalProperties[5].value;
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

module.exports = {
  getBikePointsData
};
