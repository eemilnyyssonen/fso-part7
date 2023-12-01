import { useSelector } from 'react-redux'

import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td />
            <td>Blogs created</td>
          </tr>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id.toString()}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
