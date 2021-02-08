const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: 'testuser567',
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: 'testuser567',
    __v: 0,
  },
]

const initialUser = {
  username: 'testuser567',
  name: 'testname',
  password: 'testpass567',
}

let userToken = ''
let userId = ''

beforeAll(async () => {
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send(initialUser)

  const user = await User.findOne({})
  userId = user.id
  initialBlogs[0].user = userId
  initialBlogs[1].user = userId

  const resBody = await api
    .post('/api/login')
    .send(initialUser)
    .then((res) => res.body)

  userToken = resBody.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  blogObject.user = userId
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  blogObject.user = userId
  await blogObject.save()
})

test('a blog added with no like field gets 0 likes', async () => {
  const newBlog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: userId,
    __v: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('authorization', `bearer ${userToken}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await Blog.findOne({ title: newBlog.title })
  expect(response.likes).toBe(0)
})

test('a blog added with no author and url fields sends status400', async () => {
  const newBlog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    likes: 4,
    __v: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('authorization', `bearer ${userToken}`)
    .expect(400)
})

test('a blog added with no token sends status401', async () => {
  const newBlog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    likes: 4,
    __v: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('a deleted blog returns 204, database is -1 and its url not contained on it', async () => {
  const blogToDelete = initialBlogs[0]

  await api
    // eslint-disable-next-line no-underscore-dangle
    .delete(`/api/blogs/${blogToDelete._id}`)
    .set('authorization', `bearer ${userToken}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length - 1)
  const arrayResponse = response.body
  const urlList = arrayResponse.map((r) => r.username)

  expect(urlList).not.toContain(blogToDelete.url)
})

test('blog updated', async () => {
  const updatedBlog = initialBlogs[0]
  updatedBlog.likes += 1
  await api
    // eslint-disable-next-line no-underscore-dangle
    .put(`/api/blogs/${updatedBlog._id}`)
    .send(updatedBlog)
    .expect(200)

  // eslint-disable-next-line no-underscore-dangle
  const response = await api.get(`/api/blogs/${updatedBlog._id}`)
  expect(response.body.likes).toBe(updatedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
