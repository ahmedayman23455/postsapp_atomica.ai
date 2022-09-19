import React, { useState, useEffect } from "react";
import classes from "./PostsList.module.scss";
import { FiSearch } from "react-icons/fi";
import { PostCard } from "../components";
import { useSelector } from "react-redux";
import {
  getPostsStatus,
  getPostsError,
  SelectOrderdPosts,
  getIsEmptyPosts,
} from "../Redux/slices/PostsSlice";
import { PageTransition } from "../components";

/* ------------------------------------------------------ */

const PostsList = () => {
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [notFoundMessage, setNotFoundMessage] = useState("");

  const orderedPosts = useSelector((state) => SelectOrderdPosts(state));
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const isEmptyPosts = useSelector(getIsEmptyPosts);

  useEffect(() => {
    if (postsStatus === "succeeded") {
      setSearchedPosts(orderedPosts);
    }
  }, [orderedPosts , postsStatus]);

  let posts_content = "";

  if (postsStatus === "loading") {
    posts_content = <h4 className={`${classes.loading}`}> Loading 🔃 </h4>;
  } else if (postsStatus === "succeeded") {
    posts_content = searchedPosts.map((post) => {
      return <PostCard post={post} key={post.id} />;
    });
  } else if (postsStatus === "failed") {
    posts_content = <h4 className={`${classes.error}`}> {error}❗</h4>;
  }

  const inputChangeHandler = (e) => {
    setNotFoundMessage("");
    if (postsStatus === "succeeded") {
      if (!e.target.value) {
        setSearchedPosts(orderedPosts);
        return;
      }
      const newSearchedPosts = orderedPosts.filter((post) =>
        post.title.includes(e.target.value)
      );

      if (newSearchedPosts.length === 0) {
        setNotFoundMessage(`We couldn't find a match for "${e.target.value}"`);
      }
      setSearchedPosts(newSearchedPosts);
    }
  };

  return (
    <PageTransition>
      <section className={`${classes.posts}`}>
        <div className={`${classes.container}`}>
          <div className={`${classes.about}`}>
            <h1> Posts</h1>
            <p>
              I write about development, design, React, CSS, animation and more!
            </p>
          </div>

          <div className={`${classes.inputWrapper}`}>
            <FiSearch />
            <input
              type="text"
              placeholder="Search"
              onChange={inputChangeHandler}
            />
          </div>

          {postsStatus === "succeeded" && !isEmptyPosts ? (
            <div className={`${classes.posts_grid}`}>{posts_content}</div>
          ) : (
            posts_content
          )}

          {notFoundMessage && !isEmptyPosts && (
            <h4 className={`${classes.notFound}`}> {notFoundMessage}</h4>
          )}

          {isEmptyPosts && postsStatus === "succeeded" && (
            <h4 className={`${classes.notFound}`}>There are no posts yet</h4>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default PostsList;
