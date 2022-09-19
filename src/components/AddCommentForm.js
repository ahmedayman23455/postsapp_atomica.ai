import React, { useRef } from "react";
import classes from "./AddCommentForm.module.scss";
import Button from "./Button";
import { editPost } from "../Redux/slices/PostsSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { setModal } from "../Redux/slices/ModalSlice";
/* ------------------------------------------------------ */

const AddCommentForm = ({ post }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const contentRef = useRef();

  const dispatch = useDispatch();

  const addCommentHandler = (e) => {
    e.preventDefault();
    nameRef.current.blur();
    emailRef.current.blur();
    contentRef.current.blur();

    try {
      const updatedPost = {
        ...post,
        commentsCount: post.commentsCount + 1,
        comments: [
          ...post?.comments,
          {
            id: nanoid(),
            postId: post.id,
            name: nameRef.current.value,
            email: emailRef.current.value,
            content: contentRef.current.value,
            date: new Date().toISOString(),
          },
        ],
      };

      dispatch(editPost(updatedPost));

      dispatch(
        setModal({
          message: "Your comment has been added",
          status: "success",
          to: `/posts/${post.id}`,
        })
      );
      nameRef.current.value = "";
      emailRef.current.value = "";
      contentRef.current.value = "";
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
    <article className={`${classes.addCommentForm}`}>
      <h1>Leave your comment</h1>

      <form onSubmit={addCommentHandler}>
        <div className={`${classes.inputWrapper}`}>
          <label htmlFor="title">Name</label>
          <input
            type="text"
            id="title"
            placeholder="Enter your name here (required)"
            ref={nameRef}
          />
        </div>

        <div className={`${classes.inputWrapper}`}>
          <label htmlFor="image">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email here (required)"
            required
            ref={emailRef}
          />
        </div>

        <div className={`${classes.inputWrapper}`}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            required
            rows={6}
            placeholder="Enter your content here (required)"
            ref={contentRef}
          />
        </div>

        <Button text="Post a comment" />
      </form>
    </article>
  );
};

export default AddCommentForm;
