import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import './index.scss'

import { LOG_IN } from '../../redux/constants/actions'

import Button from '../../components/Button'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn
  }
}

const mapDispatchToProps = (dispatcher) => {
  return {
    logIn: (expires) => {
      dispatcher({
        type: LOG_IN,
        expires: expires
      })
    }
  }
}

class PageLogin extends React.Component {
  constructor () {
    super()

    this.state = {
      username: '',
      password: '',
      flashMsg: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()

    axios.post('/api/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        this.props.logIn(res.data.expires)
        this.props.history.push('/app')
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange (e) {
    e.preventDefault()

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className='page-login fb-crow'>
        <div className='page-login__left'>
        </div>

        <div className='page-login__right fb-ccol'>
          <h1 className='page-login__right__title'>GRADEBOOK MCPS</h1>
          <h3 className='page-login__right__subtitle'>Please login with your MCPS issued username and password.</h3>

          <form className='page-login__right__form' onSubmit={this.handleSubmit}>
            <div className='page-login__right__form__entry fb-col'>
              <label>Username / Student ID</label>
              <input
                name='username'
                onChange={this.handleChange}
              />
            </div>

            <div className='page-login__right__form__entry fb-col'>
              <label>Password</label>
              <input
                name='password'
                type='password'
                onChange={this.handleChange}
              />
            </div>

            <input type='submit' style={{ display: 'none' }} />
          </form>

          <Button
            className='page-login__right__button'
            text='LOGIN'
            onClick={this.handleSubmit}
          />

          <p>{this.state.flashMsg}</p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageLogin)
