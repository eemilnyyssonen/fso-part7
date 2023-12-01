import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification.message) {
    return
  }

  return (
    <Alert style={{ marginBottom: '10px' }} severity={notification.type}>
      {notification.message}
    </Alert>
  )
}

export default Notification
