/** @format */

import styled from 'styled-components';
import { Field, Form } from 'formik';

export const FormBox = styled(Form)`
	display: flex;
	align-items: center;
	padding: 10px;
`;

export const ButtonsContainer = styled.div`
	display: flex;
	gap: 10px;
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ContactInput = styled(Field)`
	width: 360px;
	margin: 0;
	margin-right: auto;
	padding-top: ${p => p.theme.spacing(3)};
	padding-bottom: ${p => p.theme.spacing(3)};
	padding-left: ${p => p.theme.spacing(3)};
	padding-right: ${p => p.theme.spacing(3)};
	font-size: 24px;
	color: darkblue;
	border: none;
	background-color: transparent;
`;

export const Button = styled.button`
	border-radius: ${p => p.theme.spacing(2)};
	font-size: 22px;
	border: 1px solid rgba(0, 0, 0, 0.7);
	cursor: pointer;
	box-shadow: 0px 0px 4px 2px rgba(128, 128, 128, 0.5);
	transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
	min-width: 80px;
	height: 40px;

	&:hover {
		background-color: antiquewhite;
		transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
	}
`;

export const Label = styled.label`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 15px;
	margin-right: 20px;
	width: fit-content;
	font-size: 24px;
	font-weight: 600;
`;

export const LabelName = styled.span`
	width: 85px;
`;
