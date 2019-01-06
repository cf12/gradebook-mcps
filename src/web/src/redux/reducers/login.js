import {
  LOG_IN,
  LOG_OUT
} from '../constants/actions.js'

const initialState = {
  loggedIn: false
}

const state = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        loggedIn: true,
        expires: action.expires
      }

    case LOG_OUT:
      return {
        loggedIn: false,
        expires: 0
      }

    default:
      return state
  }
}

export default state
