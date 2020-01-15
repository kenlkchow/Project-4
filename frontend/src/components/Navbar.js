import React from 'react'
import Auth from '../lib/authMethods'

import { Link, withRouter } from 'react-router-dom'


const Navbar = (props) => {

  function handleLogout() {
    Auth.logout()
    props.history.push('/')
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
<<<<<<< HEAD
    <div className="navbar-start">
      <div className="navbar-item">
=======
    <div className="navbar-end">
      {Auth.isAuthorized() && <div className="navbar-item">
>>>>>>> development
        <Link to="/profile">Profile</Link>
      </div>}
      {!Auth.isAuthorized() && <div className="navbar-item">
        <Link to="/login">Login</Link>
      </div>}
      {!Auth.isAuthorized() && <div className="navbar-item">
        <Link to="/register">Register</Link>
      </div>}
      {Auth.isAuthorized() && <div className="navbar-item">
        <a className="navbar-item" onClick={() => handleLogout()}>Logout</a>
      </div>}
    </div>
    
  </div>
}

export default withRouter(Navbar)