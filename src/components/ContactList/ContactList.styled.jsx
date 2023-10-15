/** @format */

import styled from 'styled-components';

export const ContactsBox = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
	align-items: center;
	padding: 0;
`;

export const ContactContainer = styled.li`
	display: flex;
	width: fit-content;
	align-items: center;
	padding: ${p => p.theme.spacing(6)};
	padding-top: ${p => p.theme.spacing(2)};
	outline: 1px solid lightgray;
	border-radius: 8px;
`;
