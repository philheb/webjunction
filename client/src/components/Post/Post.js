import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loader from '../Layout/Loader/Loader'
import { getPost } from '../../actions/postActions'
import PostItem from '../Posts/PostItem'

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }

  render() {
    const { post, loading } = this.props.post
    let postContent
    if (post === null || loading) {
      postContent = <Loader />
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
        </div>
      )
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post,
})

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  { getPost }
)(Post)
