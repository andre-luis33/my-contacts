import useHome from './useHome';

import {
	Container,
	InputSearchContainer
} from './styles';


import Loader from '../../components/Loader';

import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';

import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';


export default function Home() {

	const {
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
	} = useHome();

	return (
		<Container>
			<Loader isLoading={isLoading} />

			{(contacts.length > 0 && !hasError) && (
				<InputSearchContainer>
					<input type="text" placeholder='Pesquisar Contato...' value={searchTerm} onChange={handleChangeSearchTerm} />
				</InputSearchContainer>
			)}

			<Header hasError={hasError} contactsLength={contacts.length} filteredContactsLength={filteredContacts.length} />

			{hasError && (
				<ErrorStatus onTryAgain={handleTryAgain} />
			)}

			{!hasError && (
				<>
					{(contacts.length < 1 && !isLoading) && (
						<EmptyList />
					)}


					{(contacts.length > 0 && filteredContacts.length < 1 && !isLoading) && (
						<SearchNotFound searchTerm={searchTerm} />
					)}

					<ContactsList
						filteredContacts={filteredContacts}
						orderBy={orderBy}
						onToggleOrderBy={handleToggleOrderBy}
						onDeleteContact={handleDeleteContact}
					/>

					<Modal
						danger
						isLoading={isLoadingDelete}
						visible={isDeleteModalVisible}
						title={`Tem certeza que quer deletar o "${contactBeingDeleted?.name}"?`}
						confirmLabel="Deletar"
						onCancel={handleCloseDeleteModal}
						onConfirm={handleConfirmDeleteContact}

					>
						<p>Esta ação não poderá ser desfeita!</p>
					</Modal>
				</>
			)}




		</Container>
	);
}
