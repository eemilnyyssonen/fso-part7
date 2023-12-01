import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

const Blogs = () => {
  const dispatch = useDispatch()
  const compareByLikes = (a, b) => b.likes - a.likes
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(
      setNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        'info',
      ),
    )
  }
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {user && (
        <div>
          {blogForm()}
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {blogs.toSorted(compareByLikes).map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  )
}

export default Blogs
