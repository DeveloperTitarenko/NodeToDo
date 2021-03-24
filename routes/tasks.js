const express = require('express');
const router = express.Router();
const tasks = require("../controllers/taskController")
const passport = require('passport')

router.get("/task",  passport.authenticate('jwt', { session: false }), tasks.getTasks)
router.post("/task", passport.authenticate('jwt', { session: false }), tasks.addTask)
router.delete("/task/:taskId", passport.authenticate('jwt', { session: false }), tasks.deleteTask)
router.put("/task/:taskId", passport.authenticate('jwt', { session: false }), tasks.checked)
router.put('/task', passport.authenticate('jwt', { session: false }), tasks.allChecked)
router.delete('/task', passport.authenticate('jwt', { session: false }), tasks.deleteAllCompleted)

module.exports = router