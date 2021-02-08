const initialState = {
  content: 'Page was successfully loaded',
  mType: 'success',
  visible: true,
}
let timeoutID = null
const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
  case 'CHANGENOTIFICATION': {
    const newState = {
      content: action.data.newNotification.content,
      mType: action.data.newNotification.mType,
      visible: true,
    }

    return newState
  }
  case 'HIDENOTIFICATION': {
    const newState = null
    return newState
  }
  default: return state
  }
}
export const hideReducer = () => ({
  type: 'HIDENOTIFICATION',
})

export const changeReducer = (newNotification, msTime) => (dispatch) => {
  // clearTimeout(timeoutID)
  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  timeoutID = setTimeout(() => (dispatch({
    type: 'HIDENOTIFICATION',
  })), msTime)
  dispatch({
    type: 'CHANGENOTIFICATION',
    data: { newNotification },
  })
}

export default notificationReducer
