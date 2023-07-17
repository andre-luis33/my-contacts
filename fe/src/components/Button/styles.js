import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
	height: 52px;
	padding: 16px;

	color: #fff;
	background-color: ${({ theme }) => theme.colors.primary.main};

	font-size: 16px;
	font-weight: bold;

	border-radius: 4px;
	border: none;
	box-shadow: 0 4px 10px rgba(0,0,0, .04);

	outline: none;
	transition: all .2s ease-in;

	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary.light};
	}

	&:active {
		background-color: ${({ theme }) => theme.colors.primary.dark};
	}

	&[disabled] {
		background-color: #ccc !important;
		pointer-events: none !important;
	}

	${({ theme, danger }) => danger && css`
		background: ${theme.colors.danger.main};

		&:hover {
			background-color: ${theme.colors.danger.light};
		}

		&:active {
			background-color: ${theme.colors.danger.dark};
		}
	`}
`;
