import React from 'react'

import './index.scss'

const Button = (props) => {
  return (
    <div className={'button fb-center ' + props.className} onClick={props.onClick}>
      <p>{props.text}</p>
    </div>
  )
}

export default Button
