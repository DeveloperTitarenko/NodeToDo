const mongoose = require('mongoose')

const TaskShema = mongoose.Schema({
  value: String,
  checked: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  }
  )

module.exports = {
  TaskShema,
  Task: mongoose.model('Task', TaskShema)
}