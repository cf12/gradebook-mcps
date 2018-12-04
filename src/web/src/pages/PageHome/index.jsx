import React from 'react'
import { Link } from 'react-router-dom'

class PageHome extends React.Component {
  render() {
    return (
      <div>
        <p>This is PageHome!</p>

        <Link to='/login'>PAGE LOGIN</Link>
      </div>
    )
  }
}

export default PageHome
