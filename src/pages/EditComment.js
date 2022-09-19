import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components";
import classes from "./EditComment.module.scss";
import { useSelector } from "react-redux";
import {
  selectPostById,
  selectCommentById,
  editPost,
} from "../Redux/slices/PostsSlice";

import { useDispatch } from "react-redux";
import { setModal } from "../Redux/slices/ModalSlice";
import { PageTransition } from "../components";

/* ------------------------------------------------------ */
const EditComment = () => {
  const { postId, commentId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  const selectedComment = selectCommentById(post, commentId);

  const nameRef = useRef();
  const emailRef = useRef();
  const contentRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    nameRef.current.value = selectedComment?.name;
    emailRef.current.value = selectedComment?.email;
    contentRef.current.value = selectedComment?.content;
  }, []);

  const saveCommentHandler = (e) => {
    e.preventDefault();

    nameRef.current.blur();
    contentRef.current.blur();
    emailRef.current.blur();

    try {
      // get all comments except this comment
      const updatedComments = post.comments.filter(
        (comment) => comment.id !== selectedComment.id
      );

      updatedComments.push({
        id: commentId,
        postId: postId,
        name: nameRef.current.value,
        email: emailRef.current.value,
        content: contentRef.current.value,
        date: new Date().toISOString(),
      });

      const updatedPost = { ...post, comments: updatedComments };

      dispatch(editPost(updatedPost));

      dispatch(
        setModal({
          message: "Your comment has been edited",
          status: "success",
          to: `/posts/${post.id}`,
        })
      );

      nameRef.current.value = "";
      contentRef.current.value = "";
      emailRef.current.value = "";
    } catch (err) {
      dispatch(
        setModal({
          message: `Something went wrong! please try again`,
          status: "error",
          to: `/posts/${post.id}/${commentId}`,
        })
      );
    }
  };

  const deleteCommentHandler = (e) => {
    e.preventDefault();
    try {
      // get all comments except this comment
      const updatedComments = post.comments.filter(
        (comment) => comment.id !== selectedComment.id
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
    <PageTransition>
      <section className={classes.editComment}>
        <div className={`${classes.container}`}>
          <div className={`${classes.heading}`}>
            <h1> Edit Comment</h1>
            <p>Edit your comment and save</p>
          </div>

          <form onSubmit={saveCommentHandler}>
            <div className={`${classes.inputWrapper}`}>
              <label htmlFor="title">Name</label>
              <input
                type="text"
                id="Name"
                placeholder="Enter your Name here (required)"
                required
                ref={nameRef}
              />
            </div>

            <div className={`${classes.inputWrapper}`}>
              <label htmlFor="image">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email here (required)"
                ref={emailRef}
              />
            </div>

            <div className={`${classes.inputWrapper}`}>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                required
                rows={6}
                placeholder="Enter your content here (required) "
                ref={contentRef}
              />
            </div>

            <div className={`${classes.buttons}`}>
              <Button text="Save a comment" />
              <Button text="Delete a comment" onClick={deleteCommentHandler} />
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
};

export default EditComment;
