import React from 'react'

import './Button.scss'

const Button = (props) => {
  return (
    <div className='button'>
      <p>{props.text}</p>
    </div>
  )
}

export default Button
