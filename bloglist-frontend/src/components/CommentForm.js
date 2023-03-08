import {
	Button, TextField
  } from '@mui/material'
import { useState } from "react";

const CommentForm = ({ handleComment, allComments }) => {
  const [comment, setComment] = useState("");

  return (
    <div>
      <b>New Comment</b>
      <br />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleComment(allComments.concat(comment));
          setComment("");
        }}
      >
        <div>
          <TextField
		    label="Comment:"
            type="text"
            value={comment}
            name="Comment"
            className="comment"
            id="comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <Button variant="contained" type="submit" className="create" sx={{'margin': '10px 0px'}}>
          add comment
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
