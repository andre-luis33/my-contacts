import styled from 'styled-components';


export const Container = styled.div`
	margin-top: 16px;

	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 8px;

	p {
		width: 90%;
		text-align: center;
		color: ${({ theme }) => theme.colors.gray[200]};

		strong {
			color: ${({ theme }) => theme.colors.primary.main};
		}
	}
`;
