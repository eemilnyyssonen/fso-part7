import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUser, userLogin } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          label="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          label="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        id="login-button"
        type="submit"
      >
        login
      </Button>
    </form>
  )
}

export default LoginForm
