const express = require("express")
const taskRouter = require("./routes/tasks")
const bodyParser = require('body-parser') // анализирует тела всех входящих запросов и записывает в req.data
// const usersRouter = require("./routes/users")
require('./config/passport')

const cors = require("cors") // для получения сторонних запросов

const port = 5000
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err)
  process.exit()
})

app.use(taskRouter)
app.use(userRouter)
// app.use(usersRouter)

app.get('/', (req,res) => {
  res.json({"message": "Welcome to ToDo"})
})

app.listen(port, () => {
  console.log(`listen on port ${port}`)
})