import { useEffect, useState } from 'react';
import { TCelebrity } from './components/AccordionItem';

function App() {
	const [celebs, setCelebs] = useState<TCelebrity[]>();

	const fetchData = async () => {
		const response = await fetch('./src/data/celebrities.json');
		const data = await response.json();
		setCelebs(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<main className='flex justify-center items-center min-h-screen'>
			<section className='max-w-lg py-12'>
				{celebs ? (
					<pre className='bg-slate-300'>
						{celebs?.map((el) => (
							<div key={el.id}>{el.first}</div>
						))}
					</pre>
				) : (
					<h1>Loading Celebrity Data...</h1>
				)}
			</section>
		</main>
	);
}

export default App;
