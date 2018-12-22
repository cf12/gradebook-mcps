import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn
  }
}

const RestrictedRoute = (props) => {
  if (props.loggedIn) {
    return <Route {...props} component={props.component} />
  } else {
    return <Redirect to='/login' />
  }
}

export default connect(mapStateToProps, null)(RestrictedRoute)
