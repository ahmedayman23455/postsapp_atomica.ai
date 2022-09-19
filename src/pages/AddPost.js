import React, { useRef } from "react";
import classes from "./AddPost.module.scss";
import { Button } from "../components";
import { useDispatch } from "react-redux";
import { addNewPost } from "../Redux/slices/PostsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { setModal } from "../Redux/slices/ModalSlice";
import { PageTransition } from "../components";
/* ------------------------------------------------------ */
const AddPost = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const imageURLRef = useRef();

  const dispatch = useDispatch();

  const addPostHandler = (e) => {
    e.preventDefault();
    titleRef.current.blur();
    contentRef.current.blur();
    imageURLRef.current.blur();

    try {
      dispatch(
        addNewPost({
          id: nanoid(),
          title: titleRef.current.value,
          content: contentRef.current.value,
          date: new Date(),
          imageURL: imageURLRef.current.value
            ? imageURLRef.current.value
            : "https://samuelkraft.com/_next/image?url=%2Fblog%2Fradix-ui-styling-with-css%2Fimage.png&w=1920&q=75",
          comments: [],
          commentsCount: 0,
        })
      );

      dispatch(
        setModal({
          message: "Your post has been added",
          status: "success",
          to: `/posts`,
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
          to: "/addPost",
        })
      );
    }
  };

  return (
    <PageTransition>
      <div className={classes.AddPost}>
        <div className={`${classes.container}`}>
          <div className={`${classes.heading}`}>
            <h1> Add Post</h1>
            <p>Please fill all inputs in the form</p>
          </div>

          <form onSubmit={addPostHandler}>
            <div className={`${classes.inputWrapper}`}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter your title here (required)"
                required
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
                ref={titleRef}

                // onKeyUp={(e) => {
                //   // e.preventDefault();
                //   if (e.key === "Enter") {
                //     e.target.blur();
                //   }
                // }}
              />
            </div>

            <div className={`${classes.inputWrapper}`}>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                required
                rows={6}
                placeholder="Enter your content here (required) "
                // value={content}
                // onChange={(e) => setContent(e.target.value)}
                ref={contentRef}

                // onKeyUp={(e) => {
                //   // e.preventDefault();
                //   if (e.key === "Enter") {
                //     e.target.blur();
                //   }
                // }}
              />
            </div>

            <div className={`${classes.inputWrapper}`}>
              <label htmlFor="image">Image Url</label>
              <input
                type="text"
                id="image"
                placeholder="Enter your image url here (optional)"
                // value={imageURL}
                // onChange={(e) => setImageURL(e.target.value)}
                ref={imageURLRef}
                // onKeyUp={(e) => {
                //   // e.preventDefault();
                //   if (e.key === "Enter") {
                //     e.target.blur();
                //   }
                // }}
              />
            </div>

            <Button text="Add Post" />
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default AddPost;
