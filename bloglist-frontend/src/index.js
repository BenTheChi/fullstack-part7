import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./context/NotificationContext";
import { UserContextProvider } from "./context/UserContext";
import { UsersContextProvider } from "./context/UsersContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<UserContextProvider>
		<UsersContextProvider>
		<NotificationContextProvider>
			<App />
		</NotificationContextProvider>
		</UsersContextProvider>
		</UserContextProvider>
	</QueryClientProvider>
);
