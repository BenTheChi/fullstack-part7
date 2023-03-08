import { createContext, useReducer } from "react";

const userReducer = (state, action) => {
  return action.user;
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, dispatchUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
