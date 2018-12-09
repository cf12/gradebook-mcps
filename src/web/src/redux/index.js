import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage
}

const history = createBrowserHistory
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer(history)
)

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
)

const persistor = persistStore(store)

export { store, persistor }