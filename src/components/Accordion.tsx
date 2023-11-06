import AccordionItem, { TCelebrity } from './AccordionItem';
import ConfirmModal from './ConfirmModal';
import { useCelebState } from '../store/store';

const Accordion = ({ celebs }: { celebs: TCelebrity[] }) => {
	const { isModalOpen } = useCelebState();
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
