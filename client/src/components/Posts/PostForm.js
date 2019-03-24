import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../Form/TextAreaFieldGroup'
import { addPost } from '../../actions/postActions'

class PostForm extends Component {
  state = {
    text: '',
    errors: {},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault()

    const { user } = this.props.auth

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    }
    this.props.addPost(newPost)
    this.setState({ text: '' })
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg2-light text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={this.state.errors.text}
                />
              </div>
              <button type="submit" className="btn text-white bg1">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm)
