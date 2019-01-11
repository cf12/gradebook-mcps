import React from 'react'
import axios from 'axios'
import qs from 'query-string'
import { Link } from 'react-router-dom'

import './index.scss'

class ClassCard extends React.Component {
  constructor (props) {
    super()

    this.state = {
      loaded: false,
      data: null
    }

    this.params = {
      schoolID: props.schoolID,
      term: props.term
    }
  }

  componentWillMount () {
    axios.get(`/api/class/${this.props.id}`, {
      params: this.params
    })
      .then(res => {
        this.setState({
          loaded: true,
          data: res.data
        })
      })
  }

  render () {
    if (!this.state.loaded) {
      return <p>Loading...</p>
    }

    const {
      teacher,
      room,
      percent,
      period,
      courseName: name,
      email_addr: email,
    } = this.state.data

    return (
      <Link
        className='class-card fb-row'
        to={{
          pathname: `/class/${this.props.id}`,
          search: `?${qs.stringify(this.params)}`,
        }}
      >
        <img
          className='class-card__image'
          src={require('../../assets/images/english.png')}
          alt=''
        />

        <div className='class-card__info'>
          <h1>{name}</h1>
          <p>{teacher}</p>
          <p>{email}</p>
          <p>Room {room}</p>
        </div>

        <div className='class-card__grade'>
          <p>{percent}%</p>
        </div>
        <div className='class-card__period'>
          <p>{parseInt(period, 10)}</p>
        </div>
        <div className='class-card__next'/>
      </Link>
    )
  }
}

export default ClassCard
