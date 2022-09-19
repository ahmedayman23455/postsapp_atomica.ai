import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components";
import {
  Home,
  PostsList,
  AddPost,
  SinglePostPage,
  EditPost,
  EditComment,
} from "./pages";

/* ------------------------------------------------------ */

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/posts">
          <Route index element={<PostsList />} />
          <Route path=":postId">
            <Route index element={<SinglePostPage />} />
            <Route path="editPost" element={<EditPost />} />
            <Route path=":commentId" element={<EditComment />} />
          </Route>
        </Route>

        <Route path="/addPost">
          <Route index element={<AddPost />} />
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
