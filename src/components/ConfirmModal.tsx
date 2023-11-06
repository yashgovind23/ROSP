import { X } from 'lucide-react';
import { toast } from 'react-toastify';

import { useCelebState } from '../store/store';
import toastConfig from '../config/toastConfig';

const ConfirmModal = () => {
	const { setIsModalOpen, deleteCeleb } = useCelebState();

	const onDeleteHandler = () => {
		deleteCeleb();
		toast.success('Successfully deleted', toastConfig);
	};

	return (
		<div className='absolute inset-0 bg-white flex justify-center items-center bg-opacity-10 backdrop-blur'>
			<div className='border border-gray-600 rounded-lg p-4 w-80'>
				<div className='mb-10 flex justify-between'>
					<p>Are you sure you want to delete?</p>
					<X className='text-gray-400 hover:text-gray-950 transition' />
				</div>
				<p className='flex justify-end gap-4'>
					<button
						type='button'
						className='border border-gray-600 py-1.5 px-6 rounded-xl hover:scale-105 transition'
						onClick={() => setIsModalOpen(false)}>
						Cancel
					</button>
					<button
						type='button'
						className='border border-red-500 bg-red-500 py-1.5 px-6 rounded-xl hover:scale-105 transition'
						onClick={onDeleteHandler}>
						Delete
					</button>
				</p>
			</div>
		</div>
	);
};

export default ConfirmModal;
