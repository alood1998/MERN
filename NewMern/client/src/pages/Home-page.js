import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/Fetching/PostFetching";
import PostsAll from "../components/PostsAll/PostsAll";

const HomePage = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const sortData = [...posts].sort((a, b) => {
    if (value === 0) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (value === 1) {
      return b.viewsCount - a.viewsCount;
    }
  });

  return (
    <>
      <Tabs
        onChange={handleChange}
        value={value}
        style={{ marginBottom: 15 }}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      {sortData.map((post, index) => (
        <PostsAll key={post._id} post={post} number={index + 1} />
      ))}
    </>
  );
};

export default HomePage;
