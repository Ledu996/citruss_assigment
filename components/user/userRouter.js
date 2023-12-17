const express = require('express');
const router = express.Router();
const  { register } = require("./userController");

// post for registration

router.post('/register', register);

module.exports = router;