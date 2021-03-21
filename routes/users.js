const express = require('express');
const router = express.Router();
const addUser = require('../controllers/usersController');

router.post("/addUser", addUser)

module.exports = router