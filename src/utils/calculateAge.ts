const calculateAge = (dob: string) => {
	const today = new Date();
	const birthday = new Date(dob);
	const years = today.getFullYear() - birthday.getFullYear();
	const months = today.getMonth() - birthday.getMonth();
	const days = today.getDate() - birthday.getDate();
	if (months < 0 || (months === 0 && days < 0)) {
		return years - 1;
	}
	return years;
};

export default calculateAge;
