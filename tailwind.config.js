/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'accordion-down': {
					from: { height: 0, maxHeight: 0 },
					to: { height: 'auto', maxHeight: 9999 },
				},
				'accordion-up': {
					from: {
						maxHeight: 9999,
						height: 'auto',
						overflow: 'hidden',
					},
					to: { height: 0, maxHeight: 0, overflow: 'hidden' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.5s cubic-bezier(0,1,0,1)',
				'accordion-up': 'accordion-up 0.5s cubic-bezier(1,0,1,0)',
			},
			transitionTimingFunction: {
				'accordion-down': 'cubic-bezier(1, 0, 1, 0)',
				'accordion-up': 'cubic-bezier(0, 1, 0, 1)',
			},
		},
	},
	plugins: [],
};
