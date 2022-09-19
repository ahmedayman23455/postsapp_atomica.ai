import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

/* ------------------------------------------------------ */
const initialState = {
  posts: [],
  status: "idle",
  error: null,
  isEmpty: true,
};

const POSTS_URL = "http://localhost:3500/Posts";
// const POSTS_URL = "https://postsappatomica.herokuapp.com/Posts";

/* ------------------ creaetAsyncThunk ------------------ */
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost) => {
    const response = await axios.post(POSTS_URL, newPost);
    return response.data;
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (postAfterUpdate) => {
    const { id } = postAfterUpdate;
    const response = await axios.put(`${POSTS_URL}/${id}`, postAfterUpdate);
    return response.data;
  }
);
export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
  const { id } = post;
  await axios.delete(`${POSTS_URL}/${id}`);

  return post;
});

/* --------------------- postsSlice --------------------- */
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetchPosts > pending
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        if (state.status === "idle") {
          state.status = "loading";
        }
      })
      // fetchPosts > succeeded
      .addCase(fetchPosts.fulfilled, (state, action) => {
        if (state.status === "loading") {
          state.status = "succeeded";

          if (action.payload.length <= 0) {
            state.isEmpty = true;
            return;
          } else {
            state.isEmpty = false;
          }

          state.posts = state.posts.concat(action.payload);
        }
      })

      // fetchPosts > failed
      .addCase(fetchPosts.rejected, (state, action) => {
        if (state.status === "loading") {
          state.status = "failed";
          state.error = action.error.message;
        }
      })

      // addPost > succeeded
      .addCase(addNewPost.fulfilled, (state, action) => {
        // {title, content , imageURL , date}
        state.isEmpty = false;
        state.posts.push(action.payload);
      })

      // editPost > succeeded
      .addCase(editPost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })

      // deletePost > succeeded
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        if (posts.length <= 0) {
          state.isEmpty = true;
        }
        state.posts = [...posts];
      });
    /* ------------------------------------------------------ */
  },
});

/* ---------------------- selectors --------------------- */
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getIsEmptyPosts = (state) => state.posts.isEmpty;
/* -------------------- findSelectors ------------------- */
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const selectCommentById = (post, commentId) => {
  const comment = post.comments.find((comment) => comment.id === commentId);
  return comment;
};
/* ------------------ memoized selector ----------------- */
export const SelectOrderdPosts = createSelector([selectAllPosts], (posts) => {
  return posts.slice().sort((a, b) => b.date.localeCompare(a.date));
});

export const SelectPostById = createSelector(
  [selectAllPosts, (state, postId) => postId],
  (posts, postId) => posts.filter((post) => post.id === postId)
);

export default postsSlice.reducer;
