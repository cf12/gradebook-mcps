import React from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

class ClassCard extends React.Component {
  constructor () {
    super()


  }

  render () {
    return (
      <div className='class-card fb-row'>
        <img
          className='class-card__image'
          src={require('../../assets/images/english.png')}
        />

        <div className='class-card__info'>
          <h1 className='class-card__info__name'>HON ENGLISH</h1>
          <p>Mrs. English Teacher</p>
          <p>Room 123</p>
        </div>

        <div className='class-card__grade'>
          <p>92{}</p>
        </div>
        <div className='class-card__period'>
          <p>1</p>
        </div>
        <div className='class-card__next'/>
      </div>
    )
  }
}

export default ClassCard
