const express = require('express');
const router = express.Router();
const tasks = require("../controllers/taskController")

router.get("/task", tasks.getTasks)
router.post("/task", tasks.addTask)
router.delete("/task/:taskId", tasks.deleteTask)
router.put("/task/:taskId", tasks.checked)
router.put('/task', tasks.allChecked)
router.delete('/task', tasks.deleteAllCompleted)

module.exports = router