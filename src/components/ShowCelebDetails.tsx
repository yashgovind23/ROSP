import { ChevronDown, ChevronUp, Trash2, Pencil } from 'lucide-react';

import cn from '../utils/cn';
import calculateAge from '../utils/calculateAge';
import { useCelebState } from '../store/store';
import { TCelebrity } from './AccordionItem';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

const ShowCelebDetails = ({
	celeb,
	isSelected,
}: {
	celeb: TCelebrity;
	isSelected: boolean;
}) => {
	const { isEditing, setIsEditing, accordionToggle, setIsModalOpen } =
		useCelebState();

	const age = calculateAge(celeb.dob);
	const gender = capitalizeFirstLetter(celeb.gender);

	const setEditState = () => {
		if (age > 18) setIsEditing(true);
		else return;
	};

	return (
		<div className='border border-gray-600 rounded-lg px-4 py-2 text-sm'>
			<div
				className='flex w-full gap-4 items-center cursor-pointer text-lg'
				onClick={() => accordionToggle(celeb.id, isEditing)}>
				<img src={celeb.picture} alt='' className='rounded-full h-12' />
				<p className='font-bold'>
					{celeb.first} {celeb.last}
				</p>
				<span className='ml-auto'>
					{isSelected ? <ChevronUp /> : <ChevronDown />}
				</span>
			</div>

			<div
				className={cn('h-auto', {
					'max-h-[9999px] opacity-100 transition-all duration-300 ease-accordion-down':
						isSelected,
					'max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-accordion-up':
						!isSelected,
				})}>
				<div className='grid grid-cols-3 my-4'>
					<div>
						<p className='text-gray-400'>Age</p>
						<p>{age} years</p>
					</div>
					<div>
						<p className='text-gray-400'>Gender</p>
						<p>{gender}</p>
					</div>
					<div>
						<p className='text-gray-400'>Country</p>
						<p>{celeb.country}</p>
					</div>
				</div>
				<div>
					<p className='text-gray-400'>Description</p>
					<p>{celeb.description}</p>
				</div>
				<div className='flex justify-end gap-4 mt-4'>
					<Trash2
						className='text-red-400 hover:text-red-600 transition cursor-pointer'
						onClick={() => setIsModalOpen(true)}
					/>
					<Pencil
						className='text-blue-400 hover:text-blue-600 transition cursor-pointer'
						onClick={setEditState}
					/>
				</div>
			</div>
		</div>
	);
};

export default ShowCelebDetails;
