import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core'
import Container from '@material-ui/core/Container'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import Login from './components/Login'
import MSG from './components/MSG'

import blogService from './services/blogs'

import { initializeBlogs, newBlogReducer } from './reducers/blogReducer'
import { hideReducer, changeReducer } from './reducers/notificationReducer'
import { setUserReducer } from './reducers/userReducer'

// eslint-disable-next-line no-undef
require('express-async-errors')

const App = (props) => {
  const dispatch = useDispatch()
  // const [blogs, setBlogs] = useState([])
  const { message, user } = props

  // const [user, setUser] = useState(null)
  // const [ message, setMessage] = useState(null)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  useEffect(() => {
    setTimeout(() => (dispatch(hideReducer())), 2000)
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(storedUser.token)
      props.setUserReducer(storedUser)
    }
  }, [])


  const createBlog = async (nameObject) => {

    try{
      props.newBlogReducer(nameObject)
      props.changeReducer({
        content:'New blog added to list',
        mType: 'success'
      } ,5000)
    }catch(exception){
      props.changeReducer({
        content:'Error creating blog',
        mType: 'error'
      } ,5000)
    }
  }




  return (
    <Container>
      <MSG message={message} />
      <h2>blogs</h2>

      <Router>
        <AppBar style = {{ marginDown: 10, }} position="static">
          <Toolbar>
            <Button variant="contained"  color='primary' component={Link} to="/">
              Home
            </Button>
            <Button variant="contained"  color='primary' component={Link} to="/users">
              Users List
            </Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/users/:id">
            <UserBlogs/>
          </Route>
          <Route path="/blogs/:id">
            <Blog/>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Login
              user={user}
            />
          </Route>
        </Switch>
      </Router>
      <BlogForm
        createBlog={createBlog}
      />
    </Container>
  )
}


const mapStateToProps = (state) => ({
  blogs: state.blogs,
  message: state.message,
})

const mapDispatchToProps = {
  changeReducer,
  newBlogReducer,
  setUserReducer,
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp