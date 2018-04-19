const express = require('express');

const router = express.Router();

const { getAutocomplete } = require('../controllers/google-autocomplete-controller');

router.get('/', getAutocomplete);

module.exports = router;
