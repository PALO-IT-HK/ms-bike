function getBikePointsData(tflBikeData) {
  if (Array.isArray(tflBikeData)) {
    return tflBikeData
      .filter(item => item.placeType === 'BikePoint')
      .map((item) => {
        const additionalProperties = item.additionalProperties
          .reduce((addProp, property) => ({
            ...addProp,
            [property.key]: property,
          }), {});
        return {
          commonName: item.commonName,
          id: item.id,
          lat: item.lat,
          lon: item.lon,
          modifiedDate: additionalProperties.NbBikes.modified,
          TerminalName: additionalProperties.TerminalName.value,
          NbBikes: Number(additionalProperties.NbBikes.value),
          NbEmptyDocks: Number(additionalProperties.NbEmptyDocks.value),
          NbDocks: Number(additionalProperties.NbDocks.value),
        };
      });
  }
  return [];
}

function getBikePointsDataBySearch(tflSearchBikeData) {
  if (Array.isArray(tflSearchBikeData)) {
    return tflSearchBikeData
      .filter(item => item.placeType === 'BikePoint')
      .map(item => ({
        commonName: item.commonName,
        id: item.id,
        lat: item.lat,
        lon: item.lon,
      }));
  }
  return [];
}

function getBikePointOccupancy(tflOccupancyBikeData) {
  if (Array.isArray(tflOccupancyBikeData)) {
    return tflOccupancyBikeData
      .map(item => ({
        id: item.id,
        name: item.name,
        bikesCount: Number(item.bikesCount),
        emptyDocks: Number(item.emptyDocks),
        totalDocks: Number(item.totalDocks),
      }));
  }
  return [];
}

module.exports = {
  getBikePointsData,
  getBikePointsDataBySearch,
  getBikePointOccupancy,
};
