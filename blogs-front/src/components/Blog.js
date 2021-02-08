import React , { useState } from 'react'
import {
  useParams,
} from 'react-router-dom'
import {
  FormControlLabel,
  Switch,
  Collapse,
} from '@material-ui/core'
import { connect } from 'react-redux'

import Toggable from '../components/Toggable'

import { deleteBlogReducer, updateBlogReducer, voterReducer } from '../reducers/blogReducer'
import { changeReducer } from '../reducers/notificationReducer'

const Blog = (props) => {
  const { blogs } = props
  const { id } = useParams()
  const [ comment, setComment] = useState('')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [checked, setChecked] = React.useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }
  //const arrayBlog = blogs.filter((blog) => blog.id === id)
  //myArray.find(blog => blog.id === id)
  const blog = blogs.find(blog => blog.id === id)

  const raiseLikes = async (blog) => {
    console.log(blog.id)
    const blogToUpdate = blog
    props.voterReducer(blogToUpdate)
    /*
    const updatedBlog = await blogService.likesUp(blog)
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    */
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    let updatedBlog
    if (blog.comments){
      const comments = blog.comments.concat(comment)
      updatedBlog = {
        ...blog,
        comments: comments,
      }
    } else {
      const comments = [comment]
      updatedBlog = {
        ...blog,
        comments: comments,
      }

    }
    createComment(updatedBlog)

    setComment('')
  }

  const createComment = async (commentedObject) => {

    try{
      props.updateBlogReducer(commentedObject)
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

  const deleteBlog = async (blog) => {
    if (window.confirm('Do you really want to remove the blog?')) {
      console.log(blog.id)
      //await blogService.remove(blog)
      props.deleteBlogReducer(blog)
      //setBlogs(blogs.filter(blogg => blogg.id !== blog.id))
    }
  }
  if (!blog) {
    return null
  }
  let commentKeyCounter = 0
  return(
    <div style={blogStyle} className='blogDiv'>
      {blog.title} {blog.author}
      <Toggable buttonLabel='details'>
        <p>Likes {blog.likes}
          <button className='likeButton' onClick={() => raiseLikes(blog)}>
              like
          </button>
          <button onClick={() => deleteBlog(blog)}>
              DELETE
          </button>
        </p>
        <p>Url {blog.url}</p>
      </Toggable>
      <div className="commentDiv">
        <form onSubmit={addComment}>
          <p>add comment</p>
          <input className="commentinput"
            id='comment'
            value={comment}
            onChange={handleCommentChange}
          />
          <button type="submit">submit comment</button>
        </form>
      </div>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show details"
      />
      <Collapse in={checked}>
        <ul>
          {blog.comments.map(comment => {
            commentKeyCounter = commentKeyCounter + 1
            return(
              <li key={commentKeyCounter}>{comment}</li>
            )
          })}
        </ul>
      </Collapse>
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
})

const mapDispatchToProps = {
  deleteBlogReducer,
  changeReducer,
  updateBlogReducer,
  voterReducer,
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog
