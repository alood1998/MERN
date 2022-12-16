import PostList from "../components/PostList/PostList";
import PostForm from "../components/PostForm/PostForm";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Preloader from "../UI/Preloader/Preloader";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import { fetchMyPosts } from "../store/Fetching/PostFetching";
import { clearPostsError } from "../store/Slices/postSlice";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.posts);
  const { id } = useSelector((state) => state.auth.user);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(fetchMyPosts(id));
    return () => {
      dispatch(clearPostsError());
    };
  }, []);

  return (
    <div>
      {error && <h2>{error}</h2>}
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
          <MyModal active={modal} setActive={setModal}>
            <PostForm />
          </MyModal>
          <PostList />
        </>
      )}
    </div>
  );
};

export default BlogPage;
