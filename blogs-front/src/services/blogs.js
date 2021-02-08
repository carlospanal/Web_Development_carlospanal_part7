import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${newObject.id}`, config)
  return response.data
}

const update = async newObject1 => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(newObject1)
  const newObject = { ...newObject1 }
  newObject.user = newObject.user.id
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.data
}

const likesUp = async (blog) => {

  const config = {
    headers: { Authorization: token },
  }
  const newBlog = { ...blog }
  console.log(newBlog)
  newBlog.user = newBlog.user.id

  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  return response.data
}



export default { getAll,setToken,create,likesUp,remove,update }