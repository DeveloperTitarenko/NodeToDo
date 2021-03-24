const express = require('express');
const router = express.Router();
const user = require('../controllers/usersController');
const passport = require('passport')

router.post("/register", user.signUp)
router.post("/login", user.signIn)
router.get("/private", passport.authenticate('jwt', { session: false }), user.privateRoute)

module.exports = router