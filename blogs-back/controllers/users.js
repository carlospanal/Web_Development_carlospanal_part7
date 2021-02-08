const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { body } = request
  if (!body.password) {
    response.status(400).send({ error: 'password field is missing' })
  }
  if (body.password.lenght < 3) {
    response.status(400)
      .send({ error: 'password field must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  console.log(users)
  response.json(users)
})

module.exports = usersRouter
