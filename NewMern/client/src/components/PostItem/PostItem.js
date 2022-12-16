import React from "react";
import MyButton from "../../UI/button/MyButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPostsRemove } from "../../store/Fetching/PostFetching";

const PostItem = ({ post, number }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/posts/${post._id}`);
  };

  const removePost = (e) => {
    e.preventDefault();
    dispatch(fetchPostsRemove(post._id));
  };

  return (
    <div className="post" key={post.id}>
      <div className="post__content">
        <strong>
          {number}. {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={handleClick}>Открыть</MyButton>
        <MyButton onClick={removePost}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
