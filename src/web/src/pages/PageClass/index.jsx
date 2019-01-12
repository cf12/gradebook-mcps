import React from 'react'
import axios from 'axios'
import moment from 'moment'

import './index.scss'

import {
  IoMdArrowDropdown,
  IoMdSearch
 } from 'react-icons/io'

class PageClass extends React.Component {
  constructor () {
    super()

    this.state = {
      loaded: false,
      classData: null,
      gradesData: null
    }
  }

  async componentWillMount () {
    const id = this.props.match.params.id
    const searchParams = this.props.location.search

    const classData = await axios.get(`/api/class/${id}${searchParams}`)
    const gradesData = await axios.get(`/api/class/${id}/grades${searchParams}`)

    this.setState({
      loaded: true,
      classData: classData.data,
      gradesData: gradesData.data
    })
  }

  render () {
    if (!this.state.loaded) {
      return <p>Loading...</p>
    }

    const {
      teacher,
      room,
      period,
      courseName: name,
      email_addr: email,
    } = this.state.classData

    return (
      <div className='page-class fb-ccol'>
        <div className='page-class__top fb-row'>
          <div className='page-class__top__info'>
            <h1>{name}</h1>
            <div className='separator' />
            <p>{teacher}</p>
            <p>{email}</p>
            <p>Period {period}</p>
            <p>Room {room}</p>
          </div>

          <img
            className='page-class__top__image'
            src={require('../../assets/images/english.png')}
            width={200}
            height={200}
            alt='english'
          />
        </div>

        <div className='page-class__grades'>
          <h2>GRADES</h2>

          <div className='page-class__grades__searchbar'>
            <IoMdSearch className='page-class__grades__searchbar__icon' />
            <input />
          </div>

          <table className='page-class__grades__table'>
            <thead>
              {/* TODO: SCSS flow is broken here lmao */}
              <div className='page-class__grades__table__legend__line' />
              <tr className='page-class__grades__table__legend'>
                <th width='80px' />
                <th width='80px' />
                <th width='250px'>CATEGORY</th>
                <th width='500px'>ASSIGNMENT</th>
                <th>DUE DATE</th>
                <th>GRADE</th>
              </tr>
            </thead>
            <tbody>
              {
                (this.state.loaded)
                  ? this.state.gradesData.map((entry, index) => (
                    <tr className='page-class__grades__table__entry' key={index}>
                      <th className='page-class__grades__table__entry__line' />
                      <th className='page-class__grades__table__entry__icon fb-center'>
                        <IoMdArrowDropdown size='30px' />
                      </th>
                      <th className='page-class__grades__table__entry__grade'>
                        {entry.Grade || '-'}
                      </th>
                      <th>{entry.AssignmentType}</th>
                      <th>{entry.Description}</th>
                      <th>{moment(entry.DueDate).format('MMMM Do, YYYY')}</th>
                      <th className='page-class__grades__table__entry__perc'>
                        <p>{Math.round((entry.Points / entry.Possible) * 100)}%</p>
                      </th>
                    </tr>
                  ))
                  : <p>Loading...</p>
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default PageClass
