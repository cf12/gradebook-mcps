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
      data: null
    }
  }

  componentWillMount () {
    const id = this.props.match.params.id
    const searchParams = this.props.location.search

    axios.get(`/api/class/${id}/grades${searchParams}`)
      .then(res => {
        console.log(res)
        this.setState({
          loaded: true,
          data: res.data
        })
      })
  }

  render () {
    return (
      <div className='page-class fb-ccol'>
        <div className='page-class__top fb-row'>
          <div className='page-class__top__info'>
            <h1></h1>
            <div className='separator' />
            <p>Mrs. English Teacher</p>
            <p>Period 1</p>
            <p>Room 123</p>
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
            <tbody>
              <tr className='page-class__grades__table__legend'>
                <th width='80px' />
                <th width='80px' />
                <th>CATEGORY</th>
                <th>ASSIGNMENT</th>
                <th>DUE DATE</th>
                <th>GRADE</th>
              </tr>
              {
                (this.state.loaded)
                  ? this.state.data.map(entry => (
                    <tr className='page-class__grades__table__entry'>
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
