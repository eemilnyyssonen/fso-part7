import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.users)
  const userMatch = useMatch('/users/:id')

  const user = userMatch
    ? users.find(
        (user) => user.id.toString() === userMatch.params.id.toString(),
      )
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <strong>Added blogs</strong>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
