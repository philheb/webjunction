import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../Form/TextFieldGroup'
import TextAreaFieldGroup from '../Form/TextAreaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addExperience } from '../../actions/profileActions'

class AddExperience extends Component {
  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { company, title, location, from, to, current, description } = this.state
    const data = {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
    }
    this.props.addExperience(data, this.props.history)
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onCheck = event => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    })
  }

  render() {
    return (
      <div>
        <div className="section add-experience">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">Add Your Experience</h1>
                <p className="lead text-center">
                  Add any developer/programming positions that you have had in the past
                </p>
                <small className="d-block pb-3">* = required field</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Job Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={this.state.errors.title}
                  />
                  <TextFieldGroup
                    placeholder="* Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={this.state.errors.company}
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={this.state.errors.location}
                  />
                  <h6>From Date</h6>
                  <TextFieldGroup
                    name="from"
                    type="date"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={this.state.errors.from}
                  />
                  <h6>To Date</h6>
                  <TextFieldGroup
                    name="to"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={this.state.errors.to}
                    disabled={this.state.disabled ? 'disabled' : ''}
                  />
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label className="form-check-label" htmlFor="current">
                      Current Job
                    </label>
                  </div>
                  <TextAreaFieldGroup
                    placeholder="Job Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={this.state.errors.description}
                    info="Tell us about the position"
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn bg1 text-white btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience))
