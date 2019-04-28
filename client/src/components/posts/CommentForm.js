import React from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      comment: this.state.comment,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ comment: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form className="comment-form-container" onSubmit={this.onSubmit}>
        <div className="comment-form left">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <textarea
              name="comment"
              value={this.state.comment}
              className="comment-textarea"
              placeholder="Add a Comment"
              onChange={this.onChange}
            />
            {this.props.postId == this.state.errors.id &&
              this.state.errors.comment && (
                <div className="invalid-feedback">
                  {this.state.errors.comment}
                </div>
              )}
          </div>
        </div>
        <div className="comment-btn-area right">
          <button className="btn btn-rounded btn-sm blue-gradient">
            comment
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
