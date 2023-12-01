import { useEffect } from 'react'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'
import { initUser, userLogout } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { Container, Button } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Navigation from './components/Navigation'

const Login = () => {
  return (
    <div>
      <div>
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(initUser())
    dispatch(initUsers())
  }, [dispatch])

  const pad = {
    padding: 5,
  }

  return (
    <CssBaseline>
      <Container>
        <Navigation />
        <Notification />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Blogs />} />
        </Routes>
      </Container>
    </CssBaseline>
  )
}

export default App
