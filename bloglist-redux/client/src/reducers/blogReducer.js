import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    updateBlogState(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      )
    },
  },
})

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const updateBlog = (blogObject) => {
  return async (dispatch) => {
    const { id, ...blogToUpdate } = blogObject
    const updatedBlog = await blogService.like(
      {
        ...blogToUpdate,
        user: blogToUpdate.user.id,
        likes: blogToUpdate.likes + 1,
      },
      id,
    )
    dispatch(updateBlogState(updatedBlog))
  }
}

export const addComment = (comment, id) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment({ comment }, id)
    dispatch(updateBlogState(updatedBlog))
  }
}

export const { setBlogs, appendBlog, removeBlog, updateBlogState } =
  blogSlice.actions

export default blogSlice.reducer
