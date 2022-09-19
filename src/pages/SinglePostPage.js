import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectPostById } from "../Redux/slices/PostsSlice";
import classes from "./SinglePostPage.module.scss";
import { Button, TimeAgo, AddCommentForm, CommentsList } from "../components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../Redux/slices/PostsSlice";
import { setModal } from "../Redux/slices/ModalSlice";
import { PageTransition } from "../components";

/* ------------------------------------------------------ */
const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => SelectPostById(state, postId))[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!post || post === {}) {
    return <h4 className={`${classes.notFound}`}>Post Not Found !</h4>;
  }

  const { title, content, date, imageURL, comments } = post;
  const deletePostHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(deletePost(post));
      navigate("/posts");
      dispatch(
        setModal({
          message: "Your post has been deleted",
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
    <PageTransition>
      <section className={`${classes.postPage}`}>
        <div className={`${classes.container}`}>
          <article className={`${classes.post}`}>
            <div className={`${classes.image}`}>
              <img src={imageURL} alt="Not Exist (error)" />
            </div>

            <div className={`${classes.postDetails}`}>
              <div className={`${classes.postHeader}`}>
                <div className={`${classes.left}`}>
                  <h2>{title}</h2>
                  <TimeAgo timestamp={date} />
                </div>

                <div className={`${classes.right}`}>
                  <Button
                    text="Edit Post"
                    onClick={() => {
                      navigate(`/posts/${postId}/editpost`);
                    }}
                  />
                  <Button text="Delete Post" onClick={deletePostHandler} />
                </div>
              </div>

              <p className={`${classes.postContent}`}>{content}</p>
            </div>
          </article>

          <AddCommentForm post={post} />
          <CommentsList comments={comments} post={post} />
        </div>
      </section>
    </PageTransition>
  );
};

export default React.memo(SinglePostPage);
