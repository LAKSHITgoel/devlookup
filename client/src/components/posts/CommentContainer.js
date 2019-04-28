import React from "react";
import AvatarPreview from "../avatar/AvatarPreview";

const CommentItem = props => {
  return (
    <div className="comment-item">
      <div className="left">
        <AvatarPreview size="sm" src={props.comment.avatar} />
      </div>
      <div className="right">
        <div className="comment-header">
            <div className="left">
          <div className="comment-name">{props.comment.name}</div>
            </div>
            <div className="right">
          {/* {props.comment.user === props.auth.user.id ? (
              <button className="delete-btn"
              title="delete comment"
              // onClick={onDeleteClick(props.postId, comment._id)}
              >
                <i className="fa fa-trash" />
              </button>
            ) : null} */}
            </div>
        </div>
        <div className="comment-body">
          <div className="comment-text">{props.comment.text}</div>
        </div>
      </div>
    </div>
  );
};

const CommentContainer = props => {
  return props.comment.map(obj => <CommentItem auth={props.auth} comment={obj} />);
};

export default CommentContainer;
