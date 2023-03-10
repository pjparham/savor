import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar( user ) {
  const loggedIn = user.user !== null

  return (
    <div className="navbar">
        <NavLink to="/">
          <div className="nav-title">
            {/* <div className='nav-image-container'><img className='nav-logo' src={null} alt="Burner Logo"/></div> */}
            <div className='nav-title-container'>Savor</div>
          </div>
        </NavLink>
        <div className="links">
          {loggedIn ? <NavLink to="/~recipes/new">
            <div className="nav-add">Add recipe</div>
          </NavLink> : null }
          <NavLink to={loggedIn ? `/profile`: '/signup'}>
            <div className="nav-profile">{loggedIn ? `Profile`: 'Sign Up'}</div>
          </NavLink>
        </div>
        <div className='mobile-links'>
          {loggedIn ? <NavLink to="/~recipes/new">
            <div className="nav-add">New</div>
          </NavLink> : null }
          <NavLink to={loggedIn ? `/profile`: '/signup'}>
            <div className="nav-profile">{loggedIn ? 'Me' : "Sign up"}</div>
          </NavLink>
        </div>
    </div>
  )
}
