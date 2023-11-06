const calculateDOBFromAge = (ageInYears: number) => {
	const currentDate = new Date();
	const year = currentDate.getFullYear() - ageInYears;
	const month = currentDate.getMonth() + 1;
	const day = currentDate.getDate();

	const formattedYear = year.toString().padStart(4, '0');
	const formattedMonth = month.toString().padStart(2, '0');
	const formattedDay = day.toString().padStart(2, '0');

	const dob = `${formattedYear}-${formattedMonth}-${formattedDay}`;

	return dob;
};

export default calculateDOBFromAge;
