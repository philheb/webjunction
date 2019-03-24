import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../../actions/authActions'
import { clearCurrentProfile } from '../../../actions/profileActions'

class Navbar extends Component {
  onLogoutClick = event => {
    event.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/feed">
            <i className="fas fa-edit mr-1" />
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            <i className="fas fa-tachometer-alt mr-1" />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a href="/" onClick={this.onLogoutClick} className="nav-link text-white">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            Logout
          </a>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/register">
            <i className="fas fa-user-plus mr-1" />
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/login">
            <i className="fas fa-user mr-1" />
            Login
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg0 mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <span className="logo">
              <i className="fas fa-code" /> WebJunction
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/profiles">
                  <i className="fas fa-users mr-1" />
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar)
