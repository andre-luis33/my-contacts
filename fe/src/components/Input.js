import styled, { css } from 'styled-components';

export default styled.input`
	width: 100%;
	height: 52px;
	padding: 16px;

	background-color: #fff;
	font-size: 16px;

	border: 2px solid #fff;
	border-radius: 4px;

	box-shadow: 0 4px 10px rgba(0,0,0, .04);
	outline: none;

	transition: all .2s ease-in;

	appearance: none;

	&:focus {
		border: 2px solid ${({ theme }) => theme.colors.primary.main};
	}

	&[disabled] {
		background-color: ${({ theme }) => theme.colors.gray[100]};
		border-color: ${({ theme }) => theme.colors.gray[200]};
	}

	${({ theme, error }) => error && css`
		color: ${theme.colors.danger.main};
		border-color: ${theme.colors.danger.main} !important;
	`}
`;
