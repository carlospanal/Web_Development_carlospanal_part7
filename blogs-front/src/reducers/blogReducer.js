import blogService from '../services/blogs'
// const initialState = blogsAtStart.map(asObject)

const blogReducer = (state = [], action) => {
  switch (action.type) {

  case 'NEWBLOG': {
    const newBlog = action.data.content
    const newState = state.concat(newBlog)
    return newState
  }
  case 'UPDATEBLOG': {
    const updatedBlog = action.data.content
    const filteredBlogs = state.filter(blog => blog.id !== updatedBlog.id)
    const newState = filteredBlogs.concat(updatedBlog)
    return newState
  }
  case 'INCREASEVOTES': {
    const votedBlog = state.find((blog) => blog.id === action.data.id)
    votedBlog.likes += 1
    const newState = state.filter((blog) => blog.id !== action.data.id)
      .concat(votedBlog)
    return newState
  }
  case 'INIBLOGS': {
    const iniBlogs = action.data.content
    return iniBlogs
  }
  case 'DELETEBLOG': {
    const id = action.data.id
    return state.filter(blog => blog.id !== id)
  }
  default: return state
  }
}

export const newBlogReducer = (blogContent) => async (dispatch) => {
  console.log(blogContent)
  const content = await blogService.create(blogContent)
  dispatch({
    type: 'NEWBLOG',
    data: { content },
  })
}
export const updateBlogReducer = (blogContent) => async (dispatch) => {

  const content = await blogService.update(blogContent)
  console.log(content)
  dispatch({
    type: 'UPDATEBLOG',
    data: { content },
  })
}
export const deleteBlogReducer = (blogContent) => async (dispatch) => {
  await blogService.remove(blogContent)
  const id = blogContent.id
  dispatch({
    type: 'DELETEBLOG',
    data: { id },
  })
}
export const voterReducer = (blog) => async (dispatch) => {
  const { id } = blog
  await blogService.likesUp(blog)
  dispatch({
    type: 'INCREASEVOTES',
    data: { id },
  })
}
export const initializeBlogs = () => async (dispatch) => {
  const content = await blogService.getAll()
  dispatch({
    type: 'INIBLOGS',
    data: { content },
  })
}

export default blogReducer
