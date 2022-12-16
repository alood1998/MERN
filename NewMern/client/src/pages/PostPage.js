import React, { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import MyButton from "../UI/button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostById,
  fetchPostLike,
  fetchPostUnlike,
  fetchPostViews,
} from "../store/Fetching/PostFetching";
import Box from "@mui/material/Box";
import { Fab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const PostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPostById(id));
    dispatch(fetchPostViews(id));
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const posts = useSelector((state) => state.posts.postsId);
  const userId = useSelector((state) => state.auth.user.id);
  const user = useSelector((state) => state.auth.user);
  const { postsId, error } = useSelector((state) => state.posts);
  const { isAuth } = useSelector((state) => state.auth);

  let userLikes;

  if (posts.likesCount) {
    userLikes = posts.likesCount.find((el) => el.id === userId);
  }

  const toggleLike = () => {
    if (!userLikes?.like) {
      dispatch(fetchPostLike({ postId: id, userId: user.id }));
    } else {
      dispatch(fetchPostUnlike({ postId: id, userId: user.id }));
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (error) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div>
      {postsId && (
        <>
          <strong>{postsId.title}</strong>
          <div>{postsId.body}</div>
          <hr style={{ margin: "15px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MyButton onClick={goBack}>Go back</MyButton>
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <Fab aria-label="like" onClick={toggleLike}>
                {isAuth ? (
                  <div>
                    {userLikes?.like ? (
                      <FavoriteIcon style={{ color: "red" }} />
                    ) : (
                      <FavoriteIcon />
                    )}
                  </div>
                ) : (
                  <FavoriteIcon />
                )}
              </Fab>
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default PostPage;
