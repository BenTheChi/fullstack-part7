import { createContext, useReducer } from "react";

const usersReducer = (state, action) => {
  return action.users;
};

const UsersContext = createContext();

export const UsersContextProvider = (props) => {
  const [users, dispatchUsers] = useReducer(usersReducer, null);

  return (
    <UsersContext.Provider value={[users, dispatchUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
