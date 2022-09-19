import { configureStore } from "@reduxjs/toolkit";
import PostsReducer from "./slices/PostsSlice";
import ModalReducer from "./slices/ModalSlice";

export const store = configureStore({
  reducer: { posts: PostsReducer, modal: ModalReducer },  
});
