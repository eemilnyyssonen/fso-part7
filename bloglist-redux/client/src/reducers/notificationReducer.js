import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    },
  },
})

export const setNotification = (message, type, displayTime = 5) => {
  return (dispatch) => {
    dispatch(newNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime * 1000)
  }
}

export const { newNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
