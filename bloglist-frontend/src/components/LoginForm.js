import {
	Button,
	TextField
  } from '@mui/material'

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <TextField
	    label="username:"
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      <TextField
	    label="password:"
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <Button variant="contained" type="submit" id="login-button" sx={{'margin': '10px 0px'}}>
      login
    </Button>
  </form>
);

export default LoginForm;
