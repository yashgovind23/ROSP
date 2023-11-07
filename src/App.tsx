import { useEffect, useCallback, useState } from 'react';
import { Search } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Accordion from './components/Accordion';
import { useCelebState } from './store/store';

function App() {
	const { celebData, setCelebData } = useCelebState();
	const [filterText, setFilterText] = useState('');

	const fetchData = useCallback(async () => {
		const response = await fetch('/data/celebrities.json');
		const data = await response.json();
		setCelebData(data);
	}, [setCelebData]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const filteredCelebData = celebData
		? celebData.filter((celeb) => {
				const fullNameLowerCase =
					`${celeb.first} ${celeb.last}`.toLowerCase();
				const filterTextLowerCase = filterText.toLowerCase();

				return fullNameLowerCase.includes(filterTextLowerCase);
		  })
		: [];

	return (
		<main className='flex justify-center items-start min-h-screen'>
			<section className='max-w-lg py-12'>
				<div className='flex border border-gray-600 rounded mb-4 items-center gap-2 px-3'>
					<Search />
					<input
						type='text'
						className='grow text-lg py-2 pr-3 outline-none'
						placeholder='Filter by First or Last name'
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
					/>
				</div>
				{celebData ? (
					<Accordion celebs={filteredCelebData} />
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
