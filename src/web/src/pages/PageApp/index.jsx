import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { connect } from 'react-redux'

import './index.scss'

import { ClassCard } from '../../components'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn
  }
}

class PageApp extends React.Component {
  constructor () {
    super()

    this.state = {
      loaded: false,
      data: null
    }
  }

  componentWillMount () {
    axios.get('/api/classes')
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

    const name = this.state.data[0].student
    const time = moment().format('MM/DD/YYYY @ hh:mmA')

    const filter = (entry) => {
      return entry.termid === 'MP2'
    }

    return (
      <div className='page-app'>
        <div className='page-app__top fb-ccol'>
          <h1>Welcome Back - {name}!</h1>
          <h3>Your grades since {time}</h3>
        </div>

        <div className='page-app__hero'>
          <img
            src={require('../../assets/images/school-sample.jpg')}
            width='600px'
            height='400px'
          />
          <div className='page-app__hero__info'>
            <h3>SCHOOL INFO</h3>
            <h1>SOME SCHOOL HS{}</h1>
            <p>School System Name{}</p>
          </div>
        </div>

        <div className='page-app__classes'>
          {
            this.state.data.filter(filter).map((entry, index) => (
              <ClassCard
                id={entry.sectionid}
                term={entry.termid}
                schoolID={entry.schoolid}
                key={index}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(PageApp)
