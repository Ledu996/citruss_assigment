const express = require('express');
const router = express.Router();
const { createDeposit } = require('./depositController');
const { isAuthenticated } = require('../../middlewares/permissionAccess');

router.post('/deposit', isAuthenticated, createDeposit); // protected route need a token

module.exports = router;