import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'


const Navbar = () => {


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
    <div className="navbar-start">
      <div className="navbar-item">
        <Link to="/profile">Profile</Link>
      </div>
      <div className="navbar-item">
        <Link to="/login">Login</Link>
      </div>
      <div className="navbar-item">
        <Link to="/register">Register</Link>
      </div>
    </div>
  </div>
}

export default Navbar