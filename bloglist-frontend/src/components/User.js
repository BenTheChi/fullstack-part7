import {
	TableCell,
	Link,
	TableRow
  } from '@mui/material'

import PropTypes from "prop-types";
import {
	Link as RouterLink
  } from "react-router-dom"

const User = ({ username, blogsCreated, id }) => {
	return (
		<TableRow><TableCell><Link component={RouterLink} to={`/users/${id}`} key={id}>{username}</Link></TableCell><TableCell>{blogsCreated}</TableCell></TableRow>
	)
}

User.propTypes = {
	username: PropTypes.string.isRequired,
	blogsCreated: PropTypes.number.isRequired
};
  
export default User;