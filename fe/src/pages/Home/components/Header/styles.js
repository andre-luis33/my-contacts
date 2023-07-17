import styled from 'styled-components';


export const Container = styled.header`

	display: flex;
	align-items: center;
	justify-content: ${({ justifyContent }) => justifyContent};

	padding-bottom: 16px;
	margin-top: 32px;

	border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};

	strong {
		font-size: 24px;
	}

	a {
		color: ${({ theme }) => theme.colors.primary.main};
		border: 2px solid #5061fc;

		font-weight: bold;
		text-decoration: none;

		padding: 8px 16px;
		border-radius: 4px;

		transition: all .2s ease-in;

		&:hover {
			background: ${({ theme }) => theme.colors.primary.main};
			color: #fff;
		}
	}
`;
