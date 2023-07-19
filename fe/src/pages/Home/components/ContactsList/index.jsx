import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ListHeader, Card } from './styles';

import arrow from '../../../../assets/images/arrow.svg';
import edit from '../../../../assets/images/edit.svg';
import trash from '../../../../assets/images/trash.svg';

import formatPhone from '../../../../utils/formatPhone';

export default function ContactsList({
	filteredContacts,
	orderBy,
	onToggleOrderBy,
	onDeleteContact
}) {
	return (
		<>
			{filteredContacts.length > 0 && (
				<ListHeader orderBy={orderBy}>
					<header>
						<button type='button' onClick={onToggleOrderBy}>
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
							onClick={() => onDeleteContact(contact)}
						>
							<img src={trash} alt="Ícone Lixeira" />
						</button>
					</div>
				</Card>
			))}
		</>
	);

}

ContactsList.propTypes = {
	filteredContacts: propTypes.array.isRequired,
	orderBy: propTypes.string.isRequired,
	onToggleOrderBy: propTypes.func.isRequired,
	onDeleteContact: propTypes.func.isRequired,
};
