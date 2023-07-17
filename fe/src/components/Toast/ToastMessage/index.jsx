import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/x-circle.svg';
import checkCircleIcon from '../../../assets/images/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onRemoveMessage(message.id);
		}, message.duration || 5000);


		return () => {
			clearTimeout(timeoutId);
		};
	}, [message, onRemoveMessage]);

	function handleRemoveToast() {
		onRemoveMessage(message.id);
	}

	return (
		<Container
			type={message.type}
			onClick={handleRemoveToast}
			tabIndex={0}
			role="button"
		>
			{message.type === 'danger' && <img src={xCircleIcon} alt="Ícone de X"/>}
			{message.type === 'success' && <img src={checkCircleIcon} alt="Ícone de Check"/>}
			<strong>{message.text}</strong>
		</Container>
	);
}

ToastMessage.propTypes = {
	message: PropTypes.shape({
		id: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['success', 'danger', 'default']),
		duration: PropTypes.number
	}).isRequired,
	onRemoveMessage: PropTypes.func.isRequired
};

