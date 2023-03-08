import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Home from "./components/Home";
import Menu from "./components/Menu";
import { Container } from '@mui/material'

import {
	BrowserRouter as Router,
	Routes, Route
  } from "react-router-dom"

const App = () => {

	return (
		<Container>
		<Router>
			<Menu />
			<Home />
			<Routes>
				<Route path="/" element={<Blogs />} />
				<Route path="/users" element={<Users />} />
				<Route path="/users/:id" element={<Users />} />
				<Route path="/blogs/:id" element={<Blogs />} />
			</Routes>
		</Router>
		</Container>
	)
};

export default App;
