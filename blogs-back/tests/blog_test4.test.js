const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    _id: '5a422aa71b54a676234d17f7',
    username: 'test1',
    name: 'testname',
    password: 'testpass33dfhdfhsfghfgfghdgf',
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    username: 'test2',
    name: 'testname',
    password: 'testpass33dfhdfhsfghfgfghdgf',
    __v: 0,
  },
]

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(initialUsers[0])
  await userObject.save()

  userObject = new User(initialUsers[1])
  await userObject.save()
})

test('a user added with no username gives status400 and error message', async () => {
  const newUser = {
    _id: '5a422aa71b54a676234d17f9',
    name: 'testname',
    password: 'testpass33dfhdfhsfghfgfghdgf',
    __v: 0,
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(initialUsers.length)
  const arrayResponse = response.body
  const usernameList = arrayResponse.map((r) => r.username)
  expect(usernameList.every(Boolean)).toBe(true)
})

test('a user added with short name gives status400 and error message', async () => {
  const newUser = {
    _id: '5a422aa71b54a676234d17f9',
    username: 'a',
    name: 'testname',
    password: 'testpass33dfhdfhsfghfgfghdgf',
    __v: 0,
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(initialUsers.length)
  const arrayResponse = response.body
  const usernameList = arrayResponse.map((r) => r.username)
  expect(usernameList).not.toContain(newUser.username)
})

test('a user added with existing username gives status400 and error message', async () => {
  const newUser = {
    _id: '5a422aa71b54a676234d17f9',
    username: 'test1',
    name: 'testname',
    password: 'testpass33dfhdfhsfghfgfghdgf',
    __v: 0,
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(initialUsers.length)
})

afterAll(() => {
  mongoose.connection.close()
})
