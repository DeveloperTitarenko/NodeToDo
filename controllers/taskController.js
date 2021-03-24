const { Task } = require('../models/Tasks.model')
const Users = require('../models/User.model')
const getTasks = (req, res) => {
  res.status(200).send(req.user.tasks);
}

const addTask = async (req, res) => {
  const {user} = req
  if (!req.body.value || req.body.value === "") {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }
  const task = new Task({
    value: req.body.value
  })

  user.tasks.push(task)
  await user.save()
  res.status(200).send()

}

const deleteTask = async (req, res) => {
  const {user} = req
  user.tasks.pull({_id: req.params.taskId})
  await user.save()
  res.status(200).send()

}

const checked = async (req, res) => {
  const  {params: { taskId } } = req
  const { user } = req
  const curTask = user.tasks.id(taskId)
  // curTask.checked = !curTask.checked
  // await user.save()
  // console.log(user)
  // res.status(200).send()

  await Users.findOneAndUpdate({
      _id: user._id, "tasks._id": taskId
    }, {
      "$set":{
        "tasks.$.checked": !curTask.checked
      }
    })
  res.status(200).send()

  // user.findOneAndUpdate({
  //   _id: taskId
  // }, {
  //   $set:{
  //     user.tasks.$.checked: true
  //   }
  // })
  // await user.save()
  // try {
  //   const {params: {taskId}} = req
  //   const task = await Tasks.findById(taskId).lean()
  //   await Tasks.updateOne({_id: taskId}, {
  //     checked: !task.checked
  //   })
  //   res.status(200).send()
  // } catch (err) {
  //   res.status(500).send("Server error!")
  // }
}

const allChecked = async (req, res) => {
  const { user } = req
  const countTask = user.tasks.length
  const trueTask = user.tasks.filter(task => task.checked).length
  console.log(trueTask, countTask)
  if(countTask !== trueTask){
    user.tasks.filter(i=>i.checked === false).forEach(a => a.checked = true)
    user.save()
    res.status(200).send()
  }else{
    user.tasks.forEach(task => task.checked = false)
    user.save()
    res.status(200).send()
  }




  // try {
  //   const countTrueTasks = await Tasks.countDocuments({checked: true})
  //   const allTasks = await Tasks.countDocuments()
  //   if (countTrueTasks === allTasks) {
  //     await Tasks.updateMany({checked: true}, {
  //       checked: false
  //     })
  //     return res.status(200).send()
  //   }
  //   await Tasks.updateMany({checked: false}, {
  //     checked: true
  //   })
  //   res.status(200).send()
  // } catch (err) {
  //   res.status(404).send()
  // }
}

const deleteAllCompleted = async (req, res) => {
  const { user } = req
  let i = user.tasks.length;
  while (i--) {
    const task = user.tasks[i];
    if (task.checked) {
      user.tasks.remove(task);
    }
  }
  user.save()
  res.status(200).send()
  // try {
  //   await Tasks.deleteMany({checked: true})
  //   res.status(200).send()
  // } catch (err) {
  //   res.status(404).send()
  // }
}
module.exports = {
  getTasks,
  addTask,
  deleteTask,
  checked,
  deleteAllCompleted,
  allChecked
}