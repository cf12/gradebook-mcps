import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import {
  PageHome,
  PageLogin,
  PageAppHome,
  Page404
} from './pages'

import 'normalize.css'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={PageHome} />
        <Route path='/login' component={PageLogin} />
        <Route path='/app' component={PageAppHome} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}

export default App