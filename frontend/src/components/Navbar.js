import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'


const Navbar = () => {


  return <div className="navbar">
    <div className="container">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <div className="title" id="logo-title">
            <div className="bracket-nav is-size-4">[</div>
            <div className="title-name is-size-6 has-text-weight-bold">artist_Flow</div>
            <div className="bracket-nav is-size-4">]</div>
          </div>
        </Link>
      </div>
    </div>
  </div>
}

export default Navbar