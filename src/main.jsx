import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AuthContext, { AuthContextProvider } from './Store/auth-context.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</StrictMode>
);
