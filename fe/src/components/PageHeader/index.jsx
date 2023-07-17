import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Header, Title } from './styles';

import arrow from '../../assets/images/arrow.svg';

export default function PageHeader({ title }) {
	return (
		<Header>
			<Link to="/">
				<img src={arrow} alt="Ícone Seta" />
				Voltar
			</Link>
			<Title>
				{title}
			</Title>
		</Header>
	);
}

PageHeader.propTypes = {
	title: PropTypes.string.isRequired
};
