import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { initUser, userLogout } from '../reducers/userReducer'
import { useEffect } from 'react'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <AppBar position="static" style={{ marginBottom: '10px' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {user && (
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          )}
          {user && (
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
          )}
        </div>
        <Typography variant="h7" component="div">
          Blog app
        </Typography>
        <div>
          {user ? (
            <>
              <em>{user.username} logged in</em>
              <Button
                color="inherit"
                onClick={() => {
                  dispatch(userLogout())
                  navigate('/login')
                }}
              >
                logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
