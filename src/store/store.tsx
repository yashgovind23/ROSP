import {
	Dispatch,
	ReactElement,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';

import { TCelebrity } from '../components/AccordionItem';
import { TCelebForm } from '../schema/CelebFormSchema';
import calculateDOBFromAge from '../utils/calculateDOBFromAge';

type TCelebDataContext = {
	celebData: TCelebrity[] | null;
	setCelebData: Dispatch<SetStateAction<TCelebrity[] | null>>;
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	selected: number | null;
	setSelected: Dispatch<SetStateAction<number | null>>;
	accordionToggle: (id: number, isEditing: boolean) => void;
	deleteCeleb: () => void;
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	editCeleb: (id: number, editedContent: TCelebForm) => void;
};

export const CelebDataContext = createContext<TCelebDataContext | null>(null);

export function CelebDataContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [celebData, setCelebData] = useState<TCelebrity[] | null>(null);
	const [selected, setSelected] = useState<number | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const accordionToggle = (id: number, isEditing: boolean) => {
		if (isEditing) return;
		if (id === selected) setSelected(null);
		else setSelected(id);
	};

	const deleteCeleb = () => {
		setCelebData((prev: TCelebrity[] | null) => {
			if (!prev) return null;
			return prev.filter((celeb) => celeb.id !== selected);
		});
		setIsModalOpen(false);
	};

	const editCeleb = (id: number, editedContent: TCelebForm) => {
		setCelebData((prev: TCelebrity[] | null) => {
			if (!prev) return null;
			return prev.map((celeb) => {
				if (celeb.id === id) {
					const [first, ...rest] = editedContent.fullName.split(' ');
					const last = rest.join(' ');
					const dob = calculateDOBFromAge(editedContent.age);
					return {
						...celeb,
						first,
						last,
						dob,
						country: editedContent.country,
						gender: editedContent.gender,
						description: editedContent.description,
					};
				}
				return celeb;
			});
		});
	};

	return (
		<CelebDataContext.Provider
			value={{
				celebData,
				setCelebData,
				isEditing,
				setIsEditing,
				selected,
				setSelected,
				accordionToggle,
				deleteCeleb,
				isModalOpen,
				setIsModalOpen,
				editCeleb,
			}}>
			{children}
		</CelebDataContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCelebState() {
	const context = useContext(CelebDataContext);
	if (!context) {
		throw new Error(
			'useCelebState must be used within the CelebDataContextProvider'
		);
	}
	return context;
}
