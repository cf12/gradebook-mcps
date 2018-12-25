import React from 'react'

import './index.scss'

import { IoMdArrowDropdown } from 'react-icons/io'

class PageClass extends React.Component {
  render () {
    return (
      <div className='page-class fb-ccol'>
        <div className='page-class__top fb-row'>
          <div className='page-class__top__info'>
            <h1>HON ENGLISH</h1>
            <div className='separator' />
            <p>Mrs. English Teacher</p>
            <p>Period 1</p>
            <p>Room 123</p>
          </div>

          <img
            className='page-class__top__image'
            src={require('../../assets/images/english.png')}
            width={240}
            height={240}
            alt='english'
          />
        </div>

        <div className='page-class__grades'>
          <h2>ALL GRADES</h2>
          <input></input>

          <span className='page-class__grades__legend fb-row'>
            <p>CATEGORY</p>
            <p>ASSIGNMENT</p>
            <p>DATE</p>
            <p>GRADE</p>
          </span>

          <span className='page-class__grades__entry fb-row'>
            <IoMdArrowDropdown />
            <h1>A</h1>
            <p>Homework (10%)</p>
            <p>Fatal Flaw HW</p>
            <p>January 1st, 2020</p>
            <div>
              <p>100%</p>
            </div>
          </span>

        </div>
      </div>
    )
  }
}

export default PageClass
