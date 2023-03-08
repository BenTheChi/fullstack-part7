import {
	Button
  } from '@mui/material'

import { useState, useEffect, useContext } from "react";
import loginService from "../services/login";
import blogsService from "../services/blogs";
import LoginForm from "./LoginForm";
import Notification from "./Notification";
import NotificationContext from "../context/NotificationContext";
import UserContext from "../context/UserContext";

const Home = () => {
	const [notification, dispatchNotification] = useContext(NotificationContext);
	const [currUser, dispatchUser] = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
		if (loggedUserJSON) {
		  const user = JSON.parse(loggedUserJSON);
		  dispatchUser({ user: user });
		  blogsService.setToken(user.token);
		} else {
		  dispatchUser({ user: null });
		}
	}, []);
  
	const handleLogin = async (event) => {
	  event.preventDefault();
  
	  try {
		const user = await loginService.login({
		  username,
		  password,
		});
		dispatchUser({ user: user });
		setUsername("");
		setPassword("");
		blogsService.setToken(user.token);
  
		window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
  
		dispatchNotification({ type: "LOGIN" });
		setTimeout(() => {
		  dispatchNotification({ type: "NULL" });
		}, 5000);
	  } catch (exception) {
		dispatchNotification({ type: "LOGIN_ERROR" });
		setTimeout(() => {
		  dispatchNotification({ type: "NULL" });
		}, 5000);
	  }
	};
  
	const handleLogout = async () => {
	  window.localStorage.removeItem("loggedBlogAppUser");
	  dispatchUser({ user: null });
	  dispatchNotification({ type: "LOGOUT" });
	  setTimeout(() => {
		dispatchNotification({ type: "NULL" });
	  }, 5000);
	};
  
	if (currUser === null) {
	  return (
		<div>
		  <h1>Log In To Application</h1>
		  <Notification message={notification} />
		  <LoginForm
			handleLogin={handleLogin}
			username={username}
			password={password}
			setUsername={setUsername}
			setPassword={setPassword}
		  />
		</div>
	  );
	} else {
	  return (
		<div>
		  <h1>Blogs</h1>
		  <Notification message={notification} />
		  {currUser.username} logged in <br />
		  <br /> <Button variant="contained" onClick={handleLogout} sx={{'margin': '10px 0px'}}>logout</Button>
		</div>
	  );
	}
}

export default Home