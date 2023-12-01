import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteBlog, updateBlog } from '../reducers/blogReducer'
import { useMatch } from 'react-router-dom'
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap'
const Comment = ({ comments, id }) => {
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    dispatch(addComment(comment, id))
    e.target.comment.value = ''
  }

  return (
    <div>
      <h3>comments</h3>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Control type="text" name="comment" />
          <Button variant="primary" type="submit">
            add comment
          </Button>
        </Form>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}
const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find((blog) => blog.id.toString() === match.params.id.toString())
    : null

  if (!blog) {
    return null
  }

  const showRemoveButton = user.username === blog.user.username

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div id={blog.title.replace(' ', '-')}>
      <div className="defaultContent">
        <h2>{blog.title}</h2>
        {showRemoveButton && (
          <div>
            <Button size="sm" onClick={removeBlog}>
              remove
            </Button>
          </div>
        )}
        <ListGroup>
          <ListGroup.Item>
            <a href={blog.url}>{blog.url}</a>
          </ListGroup.Item>
          <ListGroup.Item>
            likes {blog.likes}{' '}
            <Button
              size="sm"
              id="like-button"
              onClick={() => dispatch(updateBlog(blog))}
            >
              like
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>Added by {blog.user.name}</ListGroup.Item>
        </ListGroup>
        <Comment comments={blog.comments} id={blog.id} />
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
}

export default Blog
