import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import './index.scss'

class PageAppHome extends React.Component {
  constructor () {
    super()

    this.state = {
      logged: false
    }
  }

  componentWillMount () {

  }

  render () {
    if (!this.state.logged) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        <p>App Home</p>
      </div>
    )
  }
}

export default PageAppHome
