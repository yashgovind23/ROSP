import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';

import cn from '../utils/cn';
import { TCelebrity } from './AccordionItem';
import calculateAge from '../utils/calculateAge';
import { useCelebState } from '../store/store';
import {
	CelebFormSchema,
	TCelebForm,
	validGender,
} from '../schema/CelebFormSchema';

const EditForm = ({ celeb }: { celeb: TCelebrity }) => {
	const { setIsEditing, editCeleb } = useCelebState();

	const age = calculateAge(celeb.dob);

	const [formState, setFormState] = useState<TCelebForm>({
		fullName: `${celeb.first} ${celeb.last}`,
		age: age,
		country: celeb.country,
		description: celeb.description,
		gender: celeb.gender as (typeof validGender)[number],
	});

	const submitHandler = (event: SyntheticEvent) => {
		event.preventDefault();

		const results = CelebFormSchema.safeParse(formState);

		if (results.success) {
			// todo change global state
			editCeleb(celeb.id, formState);
			setIsEditing(false);
			console.log('submit success');
			return;
		}
		// todo show toast
		const issues = results.error.issues;
		for (let i = 0; i < issues.length; i++) {
			toast.error(issues[i].message, {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		}
		console.log('submit failure');
	};

	const onChangeHandler = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const key = event.target.name;
		const value = key === 'age' ? +event.target.value : event.target.value;
		console.log({ key, value });
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<form
			onSubmit={submitHandler}
			className='border border-gray-600 rounded-lg px-4 py-2 text-sm'>
			<div className='flex w-full gap-4 items-center cursor-pointer text-lg'>
				<img src={celeb.picture} alt='' className='rounded-full h-12' />
				<input
					name='fullName'
					className='font-bold'
					value={formState.fullName}
					onChange={onChangeHandler}></input>
				<span className='ml-auto'>
					<ChevronUp />
				</span>
			</div>

			<div
				className={cn(
					'h-auto max-h-[9999px] opacity-100 transition-all duration-300 ease-accordion-down'
				)}>
				<div className='grid grid-cols-3 my-4'>
					<div>
						<label htmlFor='age' className='text-gray-400'>
							Age
						</label>
						<p>
							<input
								type='number'
								name='age'
								id='age'
								onChange={onChangeHandler}
								value={formState.age}
							/>
						</p>
					</div>
					<div>
						<label htmlFor='gender' className='text-gray-400'>
							Gender
						</label>
						<select
							name='gender'
							id='gender'
							onChange={onChangeHandler}
							defaultValue={formState.gender}>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
							<option value='transgender'>Transgender</option>
							<option value='rather-not-say'>
								Rather Not Say
							</option>
						</select>
					</div>
					<div>
						<label htmlFor='country' className='text-gray-400'>
							Country
						</label>
						<input
							id='country'
							name='country'
							value={formState.country}
							onChange={onChangeHandler}
						/>
					</div>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='description' className='text-gray-400'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						rows={5}
						onChange={onChangeHandler}>
						{formState.description}
					</textarea>
				</div>
				<div className='flex justify-end gap-4 mt-4'>
					<XCircle
						className='text-red-400 hover:text-red-600 transition cursor-pointer'
						onClick={() => setIsEditing(false)}
					/>
					<button type='submit'>
						<CheckCircle2 className='text-green-400 hover:text-green-600 transition cursor-pointer' />
					</button>
				</div>
			</div>
		</form>
	);
};

export default EditForm;
