import {
	Link
  } from '@mui/material'

import { useParams, Link as RouterLink } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import blogsService from "../services/blogs";
import UserContext from "../context/UserContext";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import NotificationContext from "../context/NotificationContext";

const Blogs = () => {
	const [notification, dispatchNotification] = useContext(NotificationContext);
	const [currUser, dispatchUser] = useContext(UserContext);
	const [blogsToShow, setBlogsToShow] = useState([]);
	const result = useQuery("blogs", blogsService.getAll);
	const queryClient = useQueryClient();
	const id = useParams().id

	const updateBlogMutation = useMutation(blogsService.update, { 
	  onSuccess: () => {
		queryClient.invalidateQueries("blogs");
	  }
	});
  
	const deleteBlogMutation = useMutation(blogsService.deleteBlog, {
	  onSuccess: () => {
		queryClient.invalidateQueries("blogs");
	  }
	});

	const newBlogMutation = useMutation(blogsService.create, {
		onSuccess: () => {
		  queryClient.invalidateQueries("blogs");
		}
	});

	const handleLike = (likedBlog) => {
		let updatedBlog = likedBlog;
		updatedBlog.likes++;
		updatedBlog.user = currUser.id;
	
		updateBlogMutation.mutate(updatedBlog);
	};
	
	const handleDelete = (deleteBlog) => {
		if (!window.confirm(`Remove blog ${deleteBlog.title}?`)) return false;

		deleteBlogMutation.mutate(deleteBlog.id);
	};
	

	const addBlog = async (title, author, url) => {
		newBlogMutation.mutate({ title: title, author: author, url: url });
	
		dispatchNotification({ type: "NEW_BLOG" });
		setTimeout(() => {
		  dispatchNotification({ type: "NULL" });
		}, 5000);
	};

	const handleComment = async (comments) => {

		updateBlogMutation.mutate({comments: comments, id: id});
	}

	useEffect(() => {
		if (result.isLoading === false && currUser) {
		  const usersBlogs = result.data.filter((blog) => {
			if (blog.user) {
			  if (blog.user.username === currUser.username) {
				return true;
			  }
			}
	
			return false;
		  });
	
		  usersBlogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
		  setBlogsToShow(usersBlogs);
		} else {
		  dispatchUser({ user: null });
		}
	}, [currUser, result.data]);
	
	if (currUser === null) {
		return (
			<div>NOT LOGGED IN CAN'T SEE USER BLOGS</div>
		)
	} else if (id) {
		let currBlog;
		blogsToShow.forEach( blog => {
			if(blog.id === id){
				currBlog = blog
			}
		})

		if(!currBlog){
			return (
				<div>BLOG DOES NOT EXIST</div>
			)
		}

		return (
			<Blog
				key={currBlog.id}
				title={currBlog.title}
				author={currBlog.author}
				likes={currBlog.likes}
				url={currBlog.url}
				comments={currBlog.comments}
				handleComment={(newComments) => handleComment(newComments)}
				handleLike={() => {
				handleLike(currBlog);
				}}
				handleDelete={() => {
				handleDelete(currBlog);
				}}
			/>
		)
	} else {
		return (
			<div>
				<Togglable buttonLabel="New Blog" id="new-blog">
					<BlogForm addBlog={addBlog} />
				</Togglable>
				<ul>
					{result.isLoading ? (
						<div>LOADING</div>
					) : (
						blogsToShow.map((blog) => (
						<div>
							<Link component={RouterLink} to={`/blogs/${blog.id}`}>{blog.title}</Link>
						</div>
						
						))
					)}
				</ul>
			</div>
		)
	}
}

export default Blogs;