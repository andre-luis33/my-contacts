import propTypes from 'prop-types';
import { StyledButton } from './styles';

import Spinner from '../Spinner';

export default function Button({ type, disabled, isLoading, children, danger, onClick }) {
	return (
		<StyledButton
			type={type}
			disabled={disabled || isLoading}
			danger={danger}
			onClick={onClick}
		>
			{!isLoading && children}
			{isLoading && <Spinner size={16}/>}
		</StyledButton>
	);
}

Button.propTypes = {
	type: propTypes.string,
	disabled: propTypes.bool,
	isLoading: propTypes.bool,
	children: propTypes.node,
	danger: propTypes.bool,
	onClick: propTypes.func
};

Button.defaultProps = {
	type: 'button',
	disabled: false,
	isLoading: false,
	danger: false,
	onClick: undefined
};
