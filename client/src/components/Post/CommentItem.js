import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { deleteComment } from '../../actions/postActions'

class CommentItem extends Component {
  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
  }

  render() {
    const { comment, postId, auth } = this.props
    return (
      <div className="card card-body mb-3 shadow">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block shadow"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-8">
            <p className="lead">{comment.text}</p>
          </div>
          <div className="col-md-2 text-right">
            {comment.user === auth.user.id ? (
              <button
                type="button"
                onClick={() => this.onDeleteClick(postId, comment._id)}
                className="btn btn-danger mr-1"
              >
                <i class="fas fa-trash-alt" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem)
