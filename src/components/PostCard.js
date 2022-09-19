import React from "react";
import classes from "./PostCard.module.scss";
import { TimeAgo } from "../components";
import { Link } from "react-router-dom";

/* ------------------------------------------------------ */

const PostCard = ({ post }) => {
  const { id, title, date, imageURL } = post;

  return (
    <article className={`${classes.postCard}`}>
      <Link to={`/posts/${id}`} className={`${classes.postCard_image}`}>
        <img src={imageURL} alt="" />
      </Link>

      <div className={`${classes.postCard_content}`}>
        <h4>{title}</h4>
        <TimeAgo timestamp={date} />
      </div>
    </article>
  );
};

export default PostCard;
