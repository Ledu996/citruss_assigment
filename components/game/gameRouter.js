const express = require('express');
const router = express.Router();
const { createGame, buyGame } = require('./gameController');
const { isAuthenticated } = require('../../middlewares/permissionAccess');

router
.post('/create', isAuthenticated, createGame)
.post('/buy', isAuthenticated, buyGame)


module.exports = router;