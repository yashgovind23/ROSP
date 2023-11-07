import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CelebDataContextProvider } from './store/store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<CelebDataContextProvider>
			<App />
		</CelebDataContextProvider>
	</React.StrictMode>
);
