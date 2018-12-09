import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import login from './reducers/login'

export default (history) => combineReducers({
  router: connectRouter(history),
  login: login
})

