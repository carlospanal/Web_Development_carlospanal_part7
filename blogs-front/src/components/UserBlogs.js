import React from 'react'
import { connect } from 'react-redux'
import {
  useParams,
  Link,
} from 'react-router-dom'

const UserBlogs = (props) => {

  const { blogs } = props
  const { id } = useParams()

  const userBlogs = blogs.filter((blog) => blog.user.id === id)
  console.log(userBlogs)
  console.log(blogs)
  return (
    <ul>
      {userBlogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
    </ul>
  )

}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
})

const mapDispatchToProps = {
}

const ConnectedUserBlogs = connect(mapStateToProps, mapDispatchToProps)(UserBlogs)
export default ConnectedUserBlogs
// {users.map(user => <tr key={user.id}><td>{user.name}<td></td>1</td></tr>)}