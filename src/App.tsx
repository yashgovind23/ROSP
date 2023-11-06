import { useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Accordion from './components/Accordion';
import { useCelebState } from './store/store';

function App() {
	const { celebData, setCelebData } = useCelebState();

	const fetchData = useCallback(async () => {
		const response = await fetch('./src/data/celebrities.json');
		const data = await response.json();
		setCelebData(data);
	}, [setCelebData]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<main className='flex justify-center items-center min-h-screen'>
			<section className='max-w-lg py-12'>
				{celebData ? (
					<Accordion celebs={celebData} />
				) : (
					<h1>Loading Celebrity Data...</h1>
				)}
			</section>
			{/* <pre className='bg-slate-300'>
				{data?.map((el) => (
					<div key={el.id}>{el.first}</div>
				))}
			</pre> */}
			<ToastContainer />
		</main>
	);
}

export default App;
