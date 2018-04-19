const express = require('express');

const router = express.Router();

const { getBikepoints } = require('../controllers/transport-for-london-controller');

/**
 * @swagger
 * /bike/point:
 *   get:
 *     description: Get bike points details
 *     tags:
 *       - bike
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: swLat
 *         description: SW latitude
 *         default: '51.5'
 *         in: query
 *         required: false
 *         type: string
 *       - name: swLon
 *         description: SW longitude
 *         default: '-0.07'
 *         in: query
 *         required: false
 *         type: string
 *       - name: neLat
 *         description: NE latitude
 *         default: '51.6'
 *         in: query
 *         required: false
 *         type: string
 *       - name: neLon
 *         description: NE longitude
 *         default: '0.08'
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
router.get('/', getBikepoints);

module.exports = router;
