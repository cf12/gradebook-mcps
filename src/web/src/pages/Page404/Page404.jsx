import React from 'react'
import { Link } from 'react-router-dom'

import './Page404.scss'

import Button from '../../components/Button/Button.jsx'

class Page404 extends React.Component {
  render () {
    return (
      <div className='page-404 fb-ccol'>
        <h1 className='page-404__title'>404</h1>
        <h3 className='page-404__subtitle'>NOT FOUND</h3>

        <Link to='/'>
          <Button text='GO HOME' />
        </Link>
      </div>
    )
  }
}

export default Page404
