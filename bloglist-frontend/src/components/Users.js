import {
	Table,
	TableBody,
	TableContainer,
	TableRow,
	Paper,
  } from '@mui/material'

import {
	useParams
  } from "react-router-dom"
import { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import usersService from "../services/users";
import UsersContext from "../context/UsersContext";
import User from "./User";

const Users = () => {
	const [users, dispatchUsers] = useContext(UsersContext);
	const result = useQuery("users", usersService.getUsers);
	const id = useParams().id

	useEffect(() => {
		if (result.isLoading === false) {
		  dispatchUsers({ users: result.data})
		} else {
		  dispatchUsers({ users: null });
		}
	}, [users, result.data]);

	if(users === null){
		return (
			<div>LOADING USERS</div>
		)
	} else if(id){

		let userBlogs = [];
		users.forEach( user => {
			if(user.id === id){
				user.blogs.forEach(blog => {
					userBlogs.push(blog.title)
				})
			}
		})

		return(
			<div>
				<h1>Added Blogs</h1>
				<ul>
					{userBlogs.map((title) => (
						<li key={title}>{title}</li>
					))}
				</ul>
			</div>
		)
	} else {
		return(
			<div>
				<h1>Users</h1>
				<TableContainer sx={{ 'outline-style': 'solid' }} component={Paper}>
				<Table>
				<TableBody>
					<TableRow sx={{ 'outline-style': 'solid' }}>
						<th>Name</th>
						<th>Blogs Created</th>
					</TableRow>
						{users.map((user) => 
							<User
								key={user.id}
								username={user.username}
								blogsCreated={user.blogs.length}
								id={user.id}
							/>
						)}
				</TableBody>
				</Table>
				</TableContainer>
			</div>
		)
	}
	
};

export default Users;
