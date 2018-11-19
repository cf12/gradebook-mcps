import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'normalize.css'

import PageHome from './pages/PageHome/PageHome.jsx'
import PageLogin from './pages/PageLogin/PageLogin.jsx'
import Page404 from './pages/Page404/Page404.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={PageHome} />
        <Route path='/login' component={PageLogin} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}

export default App