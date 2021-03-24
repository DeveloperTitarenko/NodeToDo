const User = require('../models/User.model')

const signUp = async (req, res) => {
  const { email, password } = req.body
  if(!email && !password) return res.status(403).send("Password or email doesn't exist")
  const user = await User.findOne({ email })
  if(user) return res.status(400).send("User already exist")
  const newUser = new User({ email })
  console.log(newUser)
  newUser.setPassword(password)
  await newUser.save()
  res.status(200).send({ token: newUser.generateJWT()})
}

const signIn = async (req, res) => {
  const { email, password } = req.body
  if(!email && !password) return res.status(403).send("Password or email doesn't exist")
  const user = await User.findOne({ email })
  if(user.validatePassword(password)) {
    return res.status(200).send({ token: user.generateJWT()})
  } else {
    return res.status(401).send("Wrong password")
  }
}

const privateRoute = (req, res) => {
  console.log("Ok")
  console.log(req.user)
}

module.exports = {
  signUp,
  privateRoute,
  signIn
};