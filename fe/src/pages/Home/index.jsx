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

	const hasContacts   = contacts.length > 0;
	const isListEmpty   = !hasError && (!isLoading && !hasContacts);
	const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

	return (
		<Container>
			<Loader isLoading={isLoading} />

			{(hasContacts && !hasError) && (
				<InputSearchContainer>
					<input type="text" placeholder='Pesquisar Contato...' value={searchTerm} onChange={handleChangeSearchTerm} />
				</InputSearchContainer>
			)}

			<Header
				hasError={hasError}
				contactsLength={contacts.length}
				filteredContactsLength={filteredContacts.length}
			/>

			{hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
			{isListEmpty && <EmptyList />}
			{isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

			{hasContacts && (
				<>
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
