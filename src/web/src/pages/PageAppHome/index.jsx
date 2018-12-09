import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './index.scss'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn
  }
}

class PageAppHome extends React.Component {
  constructor () {
    super()
  }

  componentWillMount () {

  }

  render () {
    if (!this.props.loggedIn) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        <p>App Home</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(PageAppHome)
