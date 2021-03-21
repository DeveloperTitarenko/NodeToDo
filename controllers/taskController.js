const Tasks = require('../models/Tasks.model')

const getTasks = (req, res) => {
  Tasks.find()
    .then(tasks => {
      res.status(200).send(tasks);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving notes."
    });
  });
}

const addTask = (req, res) => {
  if (!req.body.value || req.body.value === "") {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }
  const task = new Tasks({
    value: req.body.value
  })
  task.save()
    .then(data => {
      res.send(data)
    }).catch(err => {
    res.status(500).send({
      message: err.message || "some error occurred while creating the Note."
    })
  })
}

const deleteTask = async (req, res) => {
  try {
   await Tasks.findByIdAndRemove(req.params.taskId)
    res.status(200).send()
  }catch (err){
    res.status(500).send()
  }

  //   .then(task => {
  //     if (!task) {
  //       return res.status(404).send({
  //         message: "Note not found with id " + req.params.taskId
  //       });
  //     }
  //     res.send({message: "Task deleted successfully!"});
  //   }).catch(err => {
  //   if (err.kind === 'ObjectId' || err.name === 'NotFound') {
  //     return res.status(404).send({
  //       message: "Task not found with id " + req.params.taskId
  //     });
  //   }
  //   return res.status(500).send({
  //     message: "Could not delete task with id " + req.params.taskId
  //   });
  // });
}

const checked = async (req, res) => {
  try {
    const {params: {taskId}} = req
    const task = await Tasks.findById(taskId).lean()
    await Tasks.updateOne({_id: taskId}, {
      checked: !task.checked
    })
    res.status(200).send()
  } catch (err) {
    res.status(500).send("Server error!")
  }
}

const allChecked = async (req, res) => {
  try {
    const countTrueTasks = await Tasks.countDocuments({checked: true})
    const allTasks = await Tasks.countDocuments()
    if (countTrueTasks === allTasks) {
      await Tasks.updateMany({checked: true}, {
        checked: false
      })
      return res.status(200).send()
    }
    await Tasks.updateMany({checked: false}, {
      checked: true
    })
    res.status(200).send()
  } catch (err) {
    res.status(404).send()
  }
}

const deleteAllCompleted = async (req, res) => {
  try {
    await Tasks.deleteMany({checked: true})
    res.status(200).send()
  } catch (err) {
    res.status(404).send()
  }
}
module.exports = {
  getTasks,
  addTask,
  deleteTask,
  checked,
  deleteAllCompleted,
  allChecked
}