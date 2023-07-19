import propTypes from 'prop-types';

import { Container } from './styles';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export default function SearchNotFound({ searchTerm }) {
	return (
		<Container>
			<img src={magnifierQuestion} alt="Ícone de Lupa Vermelha" />
			<span>
				Nenhum resultado foi encontrado para <strong>{`"${searchTerm}"`}</strong>.
			</span>
		</Container>
	);
}

SearchNotFound.propTypes = {
	searchTerm: propTypes.string.isRequired,
};

