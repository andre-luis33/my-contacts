import { useEffect, useState, useMemo, useCallback } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useHome() {
	const [contacts, setContacts] = useState([]);
	const [orderBy, setOrderBy] = useState('asc');
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);

	const filteredContacts = useMemo(() => {
		return contacts.filter(contact => (contact.name.toLowerCase().includes(searchTerm.toLowerCase())));
	}, [contacts, searchTerm]);

	const loadContacts = useCallback(async () => {
		try {
			setIsLoading(true);

			const contactsList = await ContactsService.getContacts(orderBy);

			setHasError(false);
			setContacts(contactsList);

		} catch (error) {

			console.log(error);
			setHasError(true);
			setContacts([]);

		} finally {
			setIsLoading(false);
		}
	}, [orderBy]);


	useEffect(() => {
		loadContacts();
	}, [loadContacts]);

	function handleToggleOrderBy() {
		setOrderBy(
			prevState => prevState === 'asc' ? 'desc' : 'asc'
		);
	}

	function handleChangeSearchTerm(event) {
		setSearchTerm(event.target.value);
	}


	function handleTryAgain() {
		loadContacts();
	}


	function handleDeleteContact(contact) {
		setContactBeingDeleted(contact);
		setIsDeleteModalVisible(true);
	}

	function handleCloseDeleteModal() {
		setIsDeleteModalVisible(false);
		setIsLoadingDelete(false);
		setContactBeingDeleted(null);
	}

	async function handleConfirmDeleteContact() {
		const { id } = contactBeingDeleted;
		setIsLoadingDelete(true);

		try {

			await ContactsService.deleteContact(id);
			toast('success', 'Contato deletado com sucesso :)', 3000);

			handleCloseDeleteModal();
			setContacts((prevState) => prevState.filter(
				(contact) => contact.id !== id
			));

		} catch {
			toast('danger', 'Ahh não! Ocorreu um erro ao deletar o contato :(', 3000);
		}
	}

	return {
		isLoading,
		isLoadingDelete,
		isDeleteModalVisible,
		contactBeingDeleted,
		handleCloseDeleteModal,
		handleConfirmDeleteContact,
		contacts,
		searchTerm,
		handleChangeSearchTerm,
		hasError,
		filteredContacts,
		handleTryAgain,
		orderBy,
		handleToggleOrderBy,
		handleDeleteContact,
	};
}
