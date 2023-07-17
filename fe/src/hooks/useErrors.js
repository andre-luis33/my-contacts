import { useCallback, useState } from 'react';

export default function useErrors() {
	const [errors, setErrors] = useState([]);

	console.log(errors);

	const setError = useCallback((fieldName, message) => {
		const errorAlreadyExists = errors.find(error => error.field === fieldName);

		if(errorAlreadyExists)
			return;

		setErrors((prev) => [
			...prev,
			{ field: fieldName, message: message }
		]);
	}, [errors]);

	const removeError = useCallback((fieldName) => {
		setErrors((prev) => prev.filter(
			(error) => error.field !== fieldName
		));
	}, []);

	const getErrorMessageByFieldName = useCallback((fieldName) => {
		const error = errors.find(error => error.field === fieldName);
		return error ? error.message : undefined;
	}, [errors]);


	return {
		errors,
		setError,
		removeError,
		getErrorMessageByFieldName
	};
}
