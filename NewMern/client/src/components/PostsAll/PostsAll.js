import React from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";

const PostsAll = ({ post, number }) => {
  return (
    <Link
      to={`/home/posts/${post._id}`}
      className={"post_hover"}
      style={{ textDecoration: "none" }}
    >
      <div className="post" key={post.id}>
        <div className="post__content">
          <p>
            <strong>Author: {post.user.fullName}</strong>
          </p>
          <strong>
            {number}. {post.title}
          </strong>
          <div>{post.body}</div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Views: {post.viewsCount}</p>
            <p style={{ textAlign: "right" }}>
              Post Date:{moment(post.createdAt).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostsAll;
