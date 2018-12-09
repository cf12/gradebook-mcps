import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux'

import {
  PageHome,
  PageLogin,
  PageAppHome,
  Page404
} from './pages'

import 'normalize.css'

// TODO: Implement loading
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={PageHome} />
            <Route path='/login' component={PageLogin} />
            <Route path='/app' component={PageAppHome} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App