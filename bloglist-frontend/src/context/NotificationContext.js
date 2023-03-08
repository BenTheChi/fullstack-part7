import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return "Successfully logged out";
    case "LOGIN":
      return "Successfully logged in";
    case "LOGIN_ERROR":
      return "Wrong credentials";
    case "NEW_BLOG":
      return "New blog added";
    case "NULL":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
