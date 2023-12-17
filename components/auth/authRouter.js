const express = require('express');
const router = express.Router();
const { authentication } = require('./authController');



router.post('/token', authentication);

module.exports = router;