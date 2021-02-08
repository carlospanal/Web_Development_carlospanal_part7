import React, { useState } from 'react'
import {
  Link,
} from 'react-router-dom'
import {
  TextField,
  Button,
} from '@material-ui/core'
import { connect } from 'react-redux'

import { voterReducer } from '../reducers/blogReducer'
import { setUserReducer } from '../reducers/userReducer'
import { changeReducer } from '../reducers/notificationReducer'

import loginService from '../services/logins'
import blogService from '../services/blogs'

const Login = (props) => {
  const { blogs,user } = props
  const sortedBlogs = blogs
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginUser = async (event) => {
    event.preventDefault()
    const nameObject = {
      username: username,
      password: password
    }
    try{
      const loggedUser = await loginService.sendLogin(nameObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      props.setUserReducer(loggedUser)
      setUsername('')
      setPassword('')
      props.changeReducer({
        content:'successful login',
        mType: 'success'
      } ,5000)
    }catch(exception){
      props.changeReducer({
        content:'wrong credentials',
        mType: 'error'
      } ,5000)
    }
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setUserReducer(null)
  }

  function compare( a, b ) {
    if ( a.likes > b.likes){
      return -1
    }
    if ( a.likes < b.likes ){
      return 1
    }
    return 0
  }
  sortedBlogs.sort(compare)

  if (user === null) {
    return(
      <form onSubmit={loginUser}>
        <TextField id="standard-search" label="Username" type="search"
          style = {{ marginRight: 10, }}
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField id="standard-search" label="Password" type="search"
          style = {{ marginRight: 10, }}
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" id="login-button" type="submit" style = {{ verticalAlign: 'bottom', }}>Login</Button>
      </form>
    )
  }
  return(
    <div>
      <p>{user.name} logged in</p>
      <button onClick={logoutUser}>logout</button>
      <ul>
        {sortedBlogs.map(blog =>
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        )}
      </ul>

    </div>

  )

}

const mapStateToProps = (state) => ({
  user: state.user,
  blogs: state.blogs
})

const mapDispatchToProps = {
  voterReducer,
  setUserReducer,
  changeReducer,
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
export default ConnectedLogin


