import React from "react";
import { useSelector } from "react-redux";
import PostItem from "../PostItem/PostItem";

const PostList = () => {
  const posts = useSelector((state) => state.posts.myPosts);
  return (
    <div>
      {posts.map((post, index) => (
        <PostItem key={post._id} post={post} number={index + 1} />
      ))}
    </div>
  );
};

export default PostList;
