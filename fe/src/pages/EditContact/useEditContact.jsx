import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';

export default function useEditContact() {
	const [isLoading, setIsLoading] = useState(true);
	const [contactName, setContactName] = useState('');

	const contactFormRef = useRef(null);

	const { id } = useParams();
	const history = useHistory();

	const isMounted = useIsMounted();

	useEffect(() => {
		async function loadContact() {

			try {
				const contact = await ContactsService.getContactById(id);

				if(isMounted()) {
					contactFormRef.current.setFieldsValues(contact);

					setContactName(contact.name);
					setIsLoading(false);
				}
			} catch {
				if(isMounted()) {
					history.push('/');
					toast('danger', 'Poxa... não foi possível recuperar as informações desse contato', 5000);
				}
			}
		}

		loadContact();

	}, [id, history, isMounted]);

	async function handleSubmit(contact) {
		try {
			await ContactsService.updateContact(id, contact);
			toast('success', 'Contato atualizado com sucesso!');

			setContactName(contact.name);

		} catch {
			toast('danger', 'Erro ao atualizar contato!');
		}
	}

	return {
		isLoading,
		contactName,
		contactFormRef,
		handleSubmit
	};
}
