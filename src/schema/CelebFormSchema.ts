import { z } from 'zod';

export const validGender = [
	'male',
	'female',
	'transgender',
	'rather-not-say',
] as const;

// todo handle too long inputs
export const CelebFormSchema = z.object({
	fullName: z
		.string()
		.min(
			3,
			'Full Name must include First Name and Last Name separated by space'
		)
		.refine(
			(value) => {
				const parts = value.split(' ');
				return parts.length >= 2 && parts[0] && parts[1];
			},
			{
				message:
					'Full Name must include First Name and Last Name separated by space.',
			}
		),
	gender: z.enum(validGender).refine((value) => validGender.includes(value), {
		message:
			'Invalid gender. Please select a valid gender from the options.',
	}),
	age: z
		.number()
		.min(1, 'Age must be more than or equal to 1.')
		.max(120, 'Age must be less than or equal to 120.'),
	country: z.string().min(4, 'Country must be at least 4 characters long.'),
	description: z
		.string()
		.min(10, 'Description must be at least 10 characters long.')
		.max(400, 'Description must be less than 400 characters long.'),
});

export type TCelebForm = z.infer<typeof CelebFormSchema>;
