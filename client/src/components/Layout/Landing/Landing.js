import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import team from '../../../assets/images/noun_teamwork.svg'

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Web Junction</h1>
                <p className="lead">
                  {' '}
                  Create a developer profile/portfolio, share posts and get help from each other.
                </p>
                <hr />
                <div className="landing-buttons">
                  <Link to="/register" className="btn btn-lg btn-block bg1 text-light mr-2">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-block bg2 text-light">
                    Login
                  </Link>
                  <img
                    className="team d-none d-md-inline"
                    src={team}
                    style={{ width: '100px', marginTop: '40px' }}
                    alt="teamwork"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Landing)
