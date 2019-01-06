import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router'

import { LOG_OUT } from '../../redux/constants/actions'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
    expires: state.login.expires
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch({
        type: LOG_OUT
      })
    }
  }
}

const RestrictedRoute = (props) => {
  if (props.loggedIn && Date.now() < props.expires) {
    return <Route component={props.component} {...props} />
  } else {
    if (props.loggedIn) props.logOut()
    return <Redirect to='/login' />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestrictedRoute)
