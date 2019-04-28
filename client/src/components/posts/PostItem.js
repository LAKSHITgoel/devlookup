import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AvatarPreview from "../avatar/AvatarPreview";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import { MDBCollapse } from "mdbreact";
import moment from "moment";
import CommentContainer from "./CommentContainer";
import CommentForm from "./CommentForm";

class PostItem extends Component {
  state = {
    collapse: ""
  };

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  toggleComment = collapse => {
    this.setState(prevState => ({
      collapse: prevState.collapse !== collapse ? collapse : ""
    }));
  };

  checkLikeOrDislike = () => {
    let a = this.props.post.likes.filter(
      obj => obj.user === this.props.auth.user.id
    );
    if (a.length == 0) return false;
    else return true;
  };

  render() {
    const { post, auth } = this.props;

    return (
      <div className="news">
        <div className="label">
          <Link to="#">
            <AvatarPreview src={post.avatar} />
          </Link>
        </div>
        <div className="excerpt">
          <div className="brief">
            <div className="feed-header">
              <div className="left">
                <Link to="#" className="name">
                  {post.name}
                </Link>{" "}
                added a new post{" "}
                <span className="date mute">
                  {moment(post.date)
                    .startOf("day")
                    .fromNow()}
                </span>
              </div>
              <div className="right">
                {post.user === auth.user.id ? (
                  <button
                    className="delete-btn"
                    title="delete post"
                    onClick={this.onDeleteClick.bind(this, post._id)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="added-content">{post.text}</div>
          <div className="feed-footer">
            <div className="left">
              <button
                onClick={
                  this.checkLikeOrDislike()
                    ? this.onUnlikeClick.bind(this, post._id)
                    : this.onLikeClick.bind(this, post._id)
                }
                type="button"
                className="feed-auth-menu-options-button"
              >
                <i
                  className={
                    this.checkLikeOrDislike()
                      ? "fas fa-thumbs-up text-info"
                      : "fas fa-thumbs-up"
                  }
                />{" "}
                <span className="">{post.likes.length + " Likes"}</span>
              </button>
            </div>
            <div className="right">
              {post.comments.length !== 0 && (
                <button
                  className="comment-toggle"
                  onClick={e => this.toggleComment(post._id)}
                >
                  {this.state.collapse !== post._id
                    ? "View Comments"
                    : "Hide Comments"}
                </button>
              )}
            </div>
          </div>
          <MDBCollapse id={post._id} isOpen={this.state.collapse}>
            <div className="feed-comments-container">
              <CommentContainer
                postId={post._id}
                auth={auth}
                comment={post.comments}
              />
            </div>
          </MDBCollapse>
          <CommentForm postId={post._id} />
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
