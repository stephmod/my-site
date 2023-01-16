/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
			labelle: ['La Belle Aurore', 'sans-serif'],
			unbound: ['Unbounded', 'sans-serif'],
		},
		fontSize: {
			header: '4rem',
			subheader: '2rem',
			sm: '0.8rem',
			md: '0.9rem',
			base: '1rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.25rem',
			'5xl': '3.1rem',
		},
		fontWeight: {
			xs: 100,
			thin: 200,
			light: 300,
			normal: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
			extrabold: 800,
			black: 900,
		},
	},
	plugins: [],
};
