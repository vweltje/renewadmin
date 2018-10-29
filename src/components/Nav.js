import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
// import 'intersection-observer'
// import Observer from '@researchgate/react-intersection-observer'

import Logo from './Logo'
import './Nav.css'

export default class Nav extends Component {
  state = {
    active: false
  }

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  render() {
    const { active } = this.state

    const NavLink = ({ className, children, ...props }) => (
      <Link
        {...props}
        className={`NavLink ${className || ''}`}
        onClick={this.handleLinkClick}
      >
        {children}
      </Link>
    )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick} title="Home">
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink
              to="/about"
              activeClassName="active"
              exact={true.toString()}
            >
              About us
            </NavLink>
            <NavLink
              to="/services/"
              activeClassName="active"
              exact={true.toString()}
            >
              Services
            </NavLink>
            <NavLink
              to="/how-it-works/"
              activeClassName="active"
              exact={true.toString()}
            >
              How it works
            </NavLink>
            <NavLink
              to="/case-studies/"
              activeClassName="active"
              exact={true.toString()}
            >
              Case studies
            </NavLink>
            <NavLink
              to="/news/"
              activeClassName="active"
              exact={true.toString()}
            >
              News
            </NavLink>
            <NavLink
              to="/contact/"
              activeClassName="active"
              exact={true.toString()}
            >
              Contact
            </NavLink>
            <NavLink to="/" className="Button ButtonSignup">
              <svg width="12" height="13" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 12.571a.28.28 0 0 0 .273.286h11.454a.28.28 0 0 0 .273-.286V12c0-2.311-1.475-4.286-4.364-4.286H4.364C1.474 7.714 0 9.69 0 12v.571zm6-5.714A3.428 3.428 0 1 0 6 0a3.428 3.428 0 0 0 0 6.857z"
                  fill="currentColor"
                />
              </svg>
              <span>Signup</span>
            </NavLink>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}
