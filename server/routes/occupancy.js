const express = require('express');

const router = express.Router();

const { getOccupancy } = require('../controllers/transport-for-london-controller');

/**
 * @swagger
 * /bikepoint/occupancy:
 *   get:
 *     description: Get occupancy for bike point
 *     tags:
 *       - bike
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bikepoint
 *         description: search query
 *         default: 'BikePoints_54'
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
router.get('/', getOccupancy);

module.exports = router;
