import {
	Button
  } from '@mui/material'

import PropTypes from "prop-types";
import { useState } from "react";
import CommentForm from "./CommentForm";

const Blog = ({ title, author, likes, url, comments = [], handleLike, handleDelete, handleComment }) => {
  const [detailsButton, setDetailsButton] = useState("SHOW");
  const [detailsStyle, setDetailsStyle] = useState({ display: "none" });

  let blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    if (detailsButton === "SHOW") {
      setDetailsButton("HIDE");
      setDetailsStyle({ display: "" });
    } else {
      setDetailsButton("SHOW");
      setDetailsStyle({ display: "none" });
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <Button variant="contained" onClick={toggleVisibility} className="detailsButton">
        {detailsButton}
      </Button>
      <div className="title">
        TITLE: {title} AUTHOR: {author}{" "}
        <Button variant="contained" onClick={handleDelete} id="deleteButton">
          DELETE
        </Button>
      </div>
      <div style={detailsStyle} className="details">
        URL: {url}
        LIKES: {likes}
        <Button variant="contained" onClick={handleLike} className="likeButton">
          LIKE
        </Button>
      </div>
	  <div>
		  <br />
		  <h2>Comments</h2>
		  <br />
		  <CommentForm handleComment={handleComment} allComments={comments}/>
		  <ul>
			{comments.map( comment => 
				<li>{comment}</li>
			)}
		  </ul>
	  </div>
    </div>
  );
};

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
