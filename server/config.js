module.exports = {
  bike_api_url: 'https://api.tfl.gov.uk/BikePoint',
  bike_search_api_url: 'https://api.tfl.gov.uk/BikePoint/Search',
  bike_occupancy_api_url: 'https://api.tfl.gov.uk/Occupancy/BikePoints',
  google_autocomplete_url:
    'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  endpointBaseUrl: process.env.ENDPOINT_BASEINTERFACE || 'localhost:3000',
  app_id: process.env.BIKE_APP_ID || '',
  bike_app_key: process.env.BIKE_APP_KEY || '',
  google_app_key: process.env.GOOGLE_APP_KEY || '',
  is_mock_data: false,
};
