import React from "react";
import Button from "./Button";
import classes from "./CommentCard.module.scss";
import TimeAgo from "./TimeAgo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editPost } from "../Redux/slices/PostsSlice";
import { setModal } from "../Redux/slices/ModalSlice";
/* ------------------------------------------------------ */
const CommentCard = ({ comment, post }) => {
  const { email, name, postId, content, date, id } = comment;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCommentHandler = (e) => {
    e.preventDefault();
    try {
      // get all comments except this comment
      const updatedComments = post.comments.filter(
        (com) => com.id !== comment.id
      );

      const updatedPost = {
        ...post,
        comments: updatedComments,
        commentsCount: post.commentsCount - 1,
      };

      dispatch(editPost(updatedPost));

      dispatch(
        setModal({
          message: "Your comment has been deleted",
          status: "success",
          to: `/posts/${post.id}`,
        })
      );
    } catch (err) {
      dispatch(
        setModal({
          message: `Something went wrong! please try again`,
          status: "error",
          to: `/posts/${post.id}`,
        })
      );
    }
  };

  return (
    <article className={`${classes.commentCard}`}>
      <div className={`${classes.heading}`}>
        <div className={`${classes.user}`}>
          <h4> {name}</h4>
          <h6> {`<${email}>`} </h6>
        </div>
        <TimeAgo timestamp={date} className={classes.date} />
      </div>

      
      <p className={`${classes.content}`}>{content}</p>

      <div className={`${classes.buttons}`}>
        <Button
          text="Edit Comment"
          onClick={() => {
            navigate(`/posts/${postId}/${id}`);
          }}
        />
        <Button text="Delete Comment" onClick={deleteCommentHandler} />
      </div>
    </article>
  );
};

export default CommentCard;
