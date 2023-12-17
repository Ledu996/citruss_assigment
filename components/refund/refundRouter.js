const express = require('express');
const router = express.Router();
const { createRefund } = require('./refundController');
const { isAuthenticated } = require('../../middlewares/permissionAccess');


router.post('/rollback', isAuthenticated,  createRefund);

module.exports = router;

