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
        loggedIn: true
      }

    case LOG_OUT:
      return {
        loggedIn: false
      }

    default:
      return state
  }
}

export default state
