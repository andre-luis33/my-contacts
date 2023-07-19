import { Link } from 'react-router-dom';
import useHome from './useHome';

import {
	Container,
	InputSearchContainer,
	ListHeader,
	Card
} from './styles';

import arrow from '../../assets/images/arrow.svg';
import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/trash.svg';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';

import formatPhone from '../../utils/formatPhone';
import SearchNotFound from './components/SearchNotFound';


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
			<Loader isLoading={isLoading}/>

			{(contacts.length > 0 && !hasError) && (
				<InputSearchContainer>
					<input type="text" placeholder='Pesquisar Contato...' value={searchTerm} onChange={handleChangeSearchTerm}/>
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
						<SearchNotFound />
					)}

					{filteredContacts.length > 0 && (
						<ListHeader orderBy={orderBy}>
							<header>
								<button type='button' onClick={handleToggleOrderBy}>
									Nome
									<img src={arrow} alt="Ícone Seta" />
								</button>
							</header>
						</ListHeader>
					)}

					{filteredContacts.length > 0 && filteredContacts.map((contact) => (
						<Card key={contact.id}>
							<div className="info">
								<div className="contact-name">
									<strong>{contact.name}</strong>
									{contact.category.name && (
										<small>{contact.category.name}</small>
									)}

								</div>

								<span>{contact.email}</span>
								<span>{formatPhone(contact.phone)}</span>
							</div>

							<div className="actions">
								<Link to={`/edit/${contact.id}`}>
									<img src={edit} alt="Ícone Edição" />
								</Link>
								<button
									onClick={() => handleDeleteContact(contact)}
								>
									<img src={trash} alt="Ícone Lixeira" />
								</button>
							</div>
						</Card>
					))}
				</>
			)}


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

		</Container>
	);
}
