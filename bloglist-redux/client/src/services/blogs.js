import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (updatedObject, id) => {
  const response = await axios.put(baseUrl.concat(`/${id}`), updatedObject)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl.concat(`/${id}`), config)
  return response
}

const addComment = async (comment, id) => {
  const response = await axios.post(baseUrl.concat(`/${id}/comments`), comment)
  return response.data
}

export default { getAll, create, setToken, like, deleteBlog, addComment }
