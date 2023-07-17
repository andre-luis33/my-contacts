import { useState, useEffect, useImperativeHandle } from 'react';

import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import isEmailValid from '../../utils/isEmailValid';
import isPhoneValid from '../../utils/isPhoneValid';
import formatPhone from '../../utils/formatPhone';

import CategoriesService from '../../services/CategoriesService';

export default function useContactForm(onSubmit, ref) {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [categories, setCategories] = useSafeAsyncState([]);
	const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		errors,
		setError,
		removeError,
		getErrorMessageByFieldName
	} = useErrors();

	const isFormValid = (name && errors.length === 0);

	useImperativeHandle(ref, () => ({
		setFieldsValues: (contact) => {
			setName(contact.name ?? '');
			setEmail(contact.email ?? '');
			setPhone(formatPhone(contact.phone ?? ''));
			setCategoryId(contact.category.id ?? '');
		},
		resetFields: () => {
			setName('');
			setEmail('');
			setPhone('');
			setCategoryId('');
		}
	}), []);


	useEffect(() => {

		async function loadCategories() {

			try {
				const categoriesList = await CategoriesService.getCategories();
				setCategories(categoriesList);
			} catch {

			} finally {
				setIsLoadingCategories(false);
			}
		}

		loadCategories();

	}, [setCategories, setIsLoadingCategories]);

	function handleNameChange(event) {
		setName(event.target.value);
		event.target.value ? removeError('name') : setError('name', 'Nome é obrigatório.');
	}

	function handleEmailChange(event) {
		setEmail(event.target.value);
		event.target.value && !isEmailValid(event.target.value) ? setError('email', 'E-mail inválido') : removeError('email');
	}

	function handlePhoneChange(event) {
		setPhone(formatPhone(event.target.value));
		event.target.value && !isPhoneValid(event.target.value) ? setError('phone', 'Telefone inválido') : removeError('phone');
	}

	async function handleSubmit(event) {
		event.preventDefault();

		setIsSubmitting(true);

		await onSubmit({ name, email, phone, categoryId });
		setIsSubmitting(false);
	}

	return {
		handleSubmit,
		getErrorMessageByFieldName,
		handleNameChange,
		name,
		isSubmitting,
		email,
		phone,
		isLoadingCategories,
		categoryId,
		categories,
		isFormValid,
		handleEmailChange,
		handlePhoneChange,
		setCategoryId
	};
}
