import React from "react";
import CommentCard from "./CommentCard";
import classes from "./CommentsList.module.scss";
import { nanoid } from "@reduxjs/toolkit";

/* ------------------------------------------------------ */

const CommentsList = ({ comments, post }) => {
  const sortedComments = comments
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const commentsCount = sortedComments.length;

  let commentsCards = sortedComments.map((comment) => {
    return <CommentCard comment={comment} post={post} key={nanoid()} />;
  });

  return (
    <section className={`${classes.commentsList}`}>
      <h1>{commentsCount} Comments</h1>

      {commentsCount === 0 ? (
        <h4 className={`${classes.notFound}`}>There are no comments yet</h4>
      ) : (
        commentsCards
      )}
    </section>
  );
};

export default CommentsList;
