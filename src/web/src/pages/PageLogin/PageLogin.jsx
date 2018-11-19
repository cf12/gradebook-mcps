import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './PageLogin.scss'

import MCPSHandler from './MCPSHandler.js'

class PageLogin extends React.Component {
  constructor () {
    super()

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log('SUBMIT EVENT')

    console.log(this.state)

    const handler = new MCPSHandler(this.state.password)
    console.log(handler.getPw())

    const url = 'https://portal.mcpsmd.org/guardian/home.html'
    const data = {
      account: this.state.username,
      ldappassword: this.state.password,
      contextData: handler.getContext(),
      pw: handler.getPw(),
      dbpw: handler.getDbpw()
    }

    axios({
      method: 'POST',
      url: 'https://cors-anywhere.herokuapp.com/' + url,
      data: data,
      // headers: { 'x-requested-with': 'localhost' }
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
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
      <div className='page-login fb-ccol'>
        <h1 className='page-login__title'>Welcome to Gradebook MCPS!</h1>

        <form className='page-login__form' onSubmit={this.handleSubmit}>
          <div className='fb-ccol'>
            <label>Username / Student ID</label>
            <input
              name='username'
              onChange={this.handleChange}
              />
          </div>

          <div className='fb-ccol'>
            <label>Password</label>
            <input
              name='password'
              type='password'
              onChange={this.handleChange}
              />
          </div>

          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default PageLogin
