import { toast } from 'react-toastify';

import AccordionItem, { TCelebrity } from './AccordionItem';
import ConfirmModal from './ConfirmModal';
import { useCelebState } from '../store/store';
import toastConfig from '../config/toastConfig';

const Accordion = ({ celebs }: { celebs: TCelebrity[] }) => {
	const { isModalOpen } = useCelebState();

	if (celebs.length === 0) {
		toast.info('No such celebrity found.', toastConfig);
	}

	return (
		<div className='flex flex-col gap-4'>
			{isModalOpen && <ConfirmModal />}

			{celebs.map((celeb) => (
				<AccordionItem celeb={celeb} key={celeb.id} />
			))}
		</div>
	);
};

export default Accordion;
