import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyButton from "../UI/button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../store/Fetching/PostFetching";
import { MdEdit } from "react-icons/md";

const MyPosts = () => {
  const { postsId, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch]);

  const goBack = () => {
    navigate(-1);
  };
  const handleClickEdit = () => {
    navigate(`/posts/${postsId._id}/edit`);
  };
  return (
    <div>
      {error && (
        <h2>
          {error}
          <div>
            <img
              src="https://99px.ru/sstorage/86/2020/03/image_861803200002071420532.gif"
              style={{ width: "200px", height: "150px" }}
              alt=""
            />
          </div>
        </h2>
      )}
      {postsId && (
        <>
          <strong>
            <MdEdit
              onClick={handleClickEdit}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            {postsId.title}
          </strong>
          <div>{postsId.body}</div>
          <hr style={{ margin: "15px 0" }} />
          <MyButton onClick={goBack}>Go back</MyButton>
        </>
      )}
    </div>
  );
};

export default MyPosts;
