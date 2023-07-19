import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
`;

export const InputSearchContainer = styled.div`
	width: 100%;

	input {
		width: 100%;
		height: 50px;

		border-radius: 25px;
		border: none;

		background-color: #fff;
		box-shadow: 1px 1px 2px rgba(0,0,0, .4);

		outline: 0;

		padding-inline: 16px;

		&::placeholder {
			color: #BCBCBC;
		}
	}
`;


export const ListHeader = styled.header`
	margin-top: 24px;
	margin-bottom: 8px;

	button {
		background: transparent;
		border: none;

		display: flex;
		align-items: center;
		column-gap: 8px;
		font-weight: bold;

		color: ${({ theme }) => theme.colors.primary.main};

		img {
			transition: transform .2s ease-in;
			transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')} ;
		}
	}

`;

export const Card = styled.div`
	background: #fff;
	box-shadow: 0 4px 10px rgba(0,0,0, .04);
	padding: 16px;
	border-radius: 4px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	& + & {
		margin-top: 16px;
	}

	.info {
		.contact-name {
			display: flex;
			align-items: center;

			small {
				background-color: ${({ theme }) => theme.colors.primary.lighter};
				color: ${({ theme }) => theme.colors.primary.main};

				font-weight: bold;
				text-transform: uppercase;

				padding: 4px;
				border-radius: 4px;
				margin-left: 8px;
			}
		}

		span {
			display: block;
			font-size: 14px;
			color: ${({ theme }) => theme.colors.gray[200]};
		}
	}


	.actions {
		display: flex;
		align-items: center;

		button {
			background: transparent;
			border: none;
			margin-left: 8px;
		}
	}
`;
