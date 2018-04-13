const express = require('express');
const router = express.Router();
const config = require('../config');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Bike Points Swagger',
      version: '1.0.0',
      description: 'Bike Points RESTful API',
      contact: {
        email: 'rmahajan@palo-it.com'
      }
    },
    tags: [
      {
        name: 'bike',
        description: 'Bike Points API'
      }
    ],
    schemes: ['http', 'https'],
    host: config.endpointBaseUrl,
    basePath: '/'
  },
  apis: [
    './server/routes/bikepoints.js',
    './server/routes/bikepoints-search.js',
    './server/routes/occupancy.js'
  ]
};

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJSDoc(options);

router.get('/json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = {
  router
};
