import { useRef } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
	const contactFormRef = useRef(null);

	async function handleSubmit(contact) {
		try {
			await ContactsService.createContact(contact);
			toast('success', 'Contato cadastrado com sucesso!');

			contactFormRef.current.resetFields();

		} catch (e) {
			console.log(e);
			toast('danger', 'Erro ao cadastrar contato!');
		}
	}

	return {
		contactFormRef,
		handleSubmit
	};
}
