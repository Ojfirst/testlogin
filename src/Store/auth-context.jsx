import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Stores isLoggrd in details
	useEffect(() => {
		const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');

		if (storedUserLoggedInInfo === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	const loginHandler = () => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
	};

	return (
		<AuthContext
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}>
			{props.children}
		</AuthContext>
	);
};

export default AuthContext;
