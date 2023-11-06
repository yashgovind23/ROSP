import EditForm from './EditForm';
import ShowCelebDetails from './ShowCelebDetails';
import { useCelebState } from '../store/store';

export type TCelebrity = {
	id: number;
	first: string;
	last: string;
	dob: string;
	gender: string;
	email: string;
	picture: string;
	country: string;
	description: string;
};

const AccordionItem = ({ celeb }: { celeb: TCelebrity }) => {
	const { isEditing, selected } = useCelebState();

	const isSelected = selected === celeb.id;

	if (isEditing && isSelected) return <EditForm celeb={celeb} />;

	return <ShowCelebDetails celeb={celeb} isSelected={isSelected} />;
};

export default AccordionItem;
