import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Sora', sans-serif;
	}

	body {
		font-size: 1rem;
		background: ${({ theme }) => theme.colors.background};
		color: ${({ theme }) => theme.colors.gray[900]};

		padding-bottom: 50px;
	}

	button {
		cursor: pointer;
	}
`;
