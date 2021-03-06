import React from 'react'
import Auth from '../lib/authMethods'

import { Link, withRouter } from 'react-router-dom'


const Navbar = (props) => {

  function handleLogout() {
    Auth.logout()
  }

  return <div className="navbar navbar-color">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <div className="title" id="logo-title">
          {/* <div className="bracket-nav is-size-8 logo">[</div> */}
          <div className="title-name is-size-6 has-text-weight-bold logo">artist_Flow</div>
          {/* <div className="bracket-nav is-size-8 logo">]</div> */}
        </div>
      </Link>
    </div>
    <div className="navbar-end">
      {Auth.isAuthorized() && <div className="navbar-item">
        <Link to="/profile"><div className="title-name is-size-6 has-text-weight-bold logo">Profile</div></Link>
      </div>}
      {!Auth.isAuthorized() && <div className="navbar-item">
        <Link to="/login"><div className="title-name is-size-6 has-text-weight-bold logo">Login</div></Link>
      </div>}
      {!Auth.isAuthorized() && <div className="navbar-item">
        <Link to="/register"><div className="title-name is-size-6 has-text-weight-bold logo">Register</div></Link>
      </div>}
      {Auth.isAuthorized() &&
        <div className="navbar-item">
          <Link
            onClick={handleLogout}
            to={{ pathname: '/' }}>
            Logout
          </Link>
        </div>}
    </div>

  </div >
}

export default withRouter(Navbar)

// <a className="navbar-item" onClick={() => handleLogout()}>Logout</a>}
