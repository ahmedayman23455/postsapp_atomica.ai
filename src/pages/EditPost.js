import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components";
import classes from "./EditPost.module.scss";
import { useSelector } from "react-redux";
import { selectPostById } from "../Redux/slices/PostsSlice";
import { editPost, deletePost } from "../Redux/slices/PostsSlice";
import { useDispatch } from "react-redux";
import { setModal } from "../Redux/slices/ModalSlice";
/* ------------------------------------------------------ */
const EditPost = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const imageURLRef = useRef();

  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));

  useEffect(() => {
    titleRef.current.value = post?.title;
    contentRef.current.value = post?.content;
    imageURLRef.current.value = post?.imageURL;
  }, []);

  const dispatch = useDispatch();

  const savePostHandler = (e) => {
    e.preventDefault();

    titleRef.current.blur();
    contentRef.current.blur();
    imageURLRef.current.blur();
    try {
      dispatch(
        editPost({
          id: postId,
          title: titleRef.current.value,
          content: contentRef.current.value,
          imageURL: imageURLRef.current.value,
          comments: post.comments,
          date: new Date().toISOString(),
        })
      );

      dispatch(
        setModal({
          message: "Your post has been edited",
          status: "success",
          to: `/posts/${post.id}`,
        })
      );

      titleRef.current.value = "";
      contentRef.current.value = "";
      imageURLRef.current.value = "";
    } catch (err) {
      dispatch(
        setModal({
          message: `Something went wrong! please try again`,
          status: "error",
          to: `/posts/${post.id}/editPost`,
        })
      );
    }
  };

  const deletePostHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(deletePost(post));
      dispatch(
        setModal({
          message: "Your post has been edited",
          status: "success",
          to: `/posts`,
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
    <section className={classes.editPost}>
      <div className={`${classes.container}`}>
        <div className={`${classes.heading}`}>
          <h1> Edit Post</h1>
          <p>Edit your post and save</p>
        </div>

        <form onSubmit={savePostHandler}>
          <div className={`${classes.inputWrapper}`}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter your title here (required)"
              required
              ref={titleRef}
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

          <div className={`${classes.inputWrapper}`}>
            <label htmlFor="image">Image Url</label>
            <input
              type="text"
              id="image"
              placeholder="Enter your image url here (optional)"
              ref={imageURLRef}
            />
          </div>

          <div className={`${classes.buttons}`}>
            <Button text="Save a post" />
            <Button text="Delete a post" onClick={deletePostHandler} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
