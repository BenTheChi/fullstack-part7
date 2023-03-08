import {
	AppBar, Toolbar, Button
  } from '@mui/material'

import { Link } from "react-router-dom"

const Menu = () => {
	  return (
		  <AppBar>
			<Toolbar>
			<Button color='inherit' component={Link} to="/">Blogs</Button>
			<Button color='inherit' component={Link} to="/users">Users</Button>
			</Toolbar>
		  </AppBar>
	  )
}

export default Menu;