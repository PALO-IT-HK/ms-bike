const express = require('express');

const router = express.Router();

const { searchBikepoints } = require('../controllers/transport-for-london-controller');

/**
 * @swagger
 * /bikepoint/search:
 *   get:
 *     description: Search bike point
 *     tags:
 *       - bike
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: query
 *         description: search query
 *         default: 'Westminster'
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
router.get('/', searchBikepoints);

module.exports = router;
