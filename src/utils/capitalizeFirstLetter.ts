const capitalizeFirstLetter = (str: string) => {
	const arr = str.split('-');
	return arr.map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(' ');
};

export default capitalizeFirstLetter;
