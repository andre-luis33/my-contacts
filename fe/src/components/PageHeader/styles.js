import styled from 'styled-components';

export const Header = styled.header`
	margin-bottom: 24px;

	a {
		text-decoration: none;

		display: inline-flex;
		align-items: center;
		column-gap: 8px;

		font-weight: bold;
		color: ${({ theme }) => theme.colors.primary.main};

		margin-bottom: 8px;

		img {
			transform: rotate(-90deg);
		}
	}
`;

export const Title = styled.h1`
	font-size: 24px;
`;
