import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/Home-page";
import BlogPage from "../../pages/Blog-page";
import AboutPage from "../../pages/About-page";
import ErrorPage from "../../pages/Error-page";
import MyPosts from "../../pages/MyPosts";
import PrivateRoutes from "../../pages/privateRoutes";
import LoginForm from "../Form/LoginForm";
import UpdatePostPage from "../../pages/UpdatePost-page";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/Fetching/UserFetching";
import PersonalInformation from "../../pages/PersonalInformation";
import PostPage from "../../pages/PostPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if ("token" in window.localStorage) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="home/posts/:id" element={<PostPage />} />
          <Route
            path="posts"
            element={
              <PrivateRoutes>
                <BlogPage />
              </PrivateRoutes>
            }
          />
          <Route path="posts/:id" element={<MyPosts />} />
          <Route path="posts/:id/edit" element={<UpdatePostPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<LoginForm />} />
          <Route
            path="cabinet"
            element={
              <PrivateRoutes>
                <PersonalInformation />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
