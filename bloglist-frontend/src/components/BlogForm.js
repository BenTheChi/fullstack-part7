import {
	Button, TextField
  } from '@mui/material'
import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  return (
    <div>
      <b>Create New </b>
      <br />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addBlog(title, author, url);
          setTitle("");
          setAuthor("");
          setUrl("");
        }}
      >
        <div>
          <TextField
		    label="title:"
            type="text"
            value={title}
            name="Title"
            className="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
		  	label="author:"
            type="text"
            value={author}
            name="Author"
            className="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
		    label="url:"
            type="text"
            value={url}
            name="Url"
            className="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="contained" type="submit" className="create" sx={{'margin': '10px 0px'}}>
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
