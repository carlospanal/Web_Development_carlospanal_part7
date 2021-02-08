const userReducer = (state = null, action) => {

  switch (action.type) {
  case 'SETUSER': {
    const newState = action.data.user

    return newState
  }

  default: return state
  }
}

export const setUserReducer = (user) => (dispatch) => {
  // clearTimeout(timeoutID)

  dispatch({
    type: 'SETUSER',
    data: { user },
  })
}

export default userReducer