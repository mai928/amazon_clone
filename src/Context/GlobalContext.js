import { createContext, useContext, useReducer } from "react";
import AppReducer, { initialValue } from "./AppReducer";
export const GlobalContext = createContext();

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialValue);

	return (
		<GlobalContext.Provider
			value={{ basket: state.basket, user: state.user, dispatch }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default ContextProvider;

export const useAuth = () => {
	return useContext(GlobalContext);
};
