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


