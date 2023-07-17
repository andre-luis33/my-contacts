import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import { Container } from './styles';

export default function Header({ hasError, contactsLength, filteredContactsLength }) {
	return (
		<Container justifyContent={contactsLength > 0 ? 'space-between' : 'center'}>

			{(!hasError && contactsLength > 0) && (
				<strong>
					{filteredContactsLength}
					{filteredContactsLength === 1 ? ' contato' : ' contatos'}
				</strong>
			)}
			<Link to="/new">Novo Contato</Link>

		</Container>
	);
}

Header.propTypes = {
	hasError: propTypes.bool.isRequired,
	contactsLength: propTypes.number.isRequired,
	filteredContactsLength: propTypes.number.isRequired
};
