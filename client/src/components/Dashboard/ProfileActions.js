import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileActions() {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-edit accent2 mr-1" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fas fa-user-tie accent2 mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-user-graduate accent2 mr-1" />
        Add Education
      </Link>
    </div>
  )
}
