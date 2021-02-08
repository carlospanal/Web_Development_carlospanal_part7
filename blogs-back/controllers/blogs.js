/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "__v"] }] */
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogsRouter.get('/info', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  console.log(request)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request
  const { token } = request

  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.author && !blog.url) {
    return response.status(400).send()
  }

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()
  return response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const { token } = request

  const decodedToken = jwt.verify(token, process.env.SECRET)
  const userId = decodedToken.id
  const blogId = request.params.id

  if (!token || !userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToDelete = await Blog.findById(blogId)
  if (blogToDelete.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(blogId)
    return response.status(204).end()
  }
  return response.status(404).json({ error: 'not existing blog or wrong user' })
})

blogsRouter.put('/:id', async (request, response) => {
  console.log(request.params.id)
  console.log(request.body)
  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedNote.toJSON())
})

module.exports = blogsRouter
