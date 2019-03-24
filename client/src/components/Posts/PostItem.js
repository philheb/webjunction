import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/postActions'

class PostItem extends Component {
  onDeleteClick = id => {
    this.props.deletePost(id)
  }
  onLikeClick = id => {
    this.props.addLike(id)
  }
  onUnlikeClick = id => {
    this.props.removeLike(id)
  }
  findUserLike = likes => {
    const { auth } = this.props
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true
    } else {
      return false
    }
  }
  render() {
    const { auth, post, showActions } = this.props
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-xs-1 col-sm-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-sm-block" src={post.avatar} alt="" />
            </a>
          </div>
          <div className="col-8">
            <h3>{post.name}</h3>
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={() => this.onLikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      accent1: this.findUserLike(post.likes),
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => this.onUnlikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn bg1 text-light mr-1">
                  Comments
                </Link>
              </span>
            ) : null}
          </div>
          <div className="col-xs-4 col-2 text-right">
            {post.user === auth.user.id ? (
              <button
                type="button"
                onClick={() => this.onDeleteClick(post._id)}
                className="btn bg6"
              >
                <i className="fas fa-trash-alt text-white" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true,
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem)
