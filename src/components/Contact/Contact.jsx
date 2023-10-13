/** @format */

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { statusLoadingState } from 'redux/selectors';
import {
	FormBox,
	ContactInput,
	ButtonsContainer,
	InputContainer,
	Button,
	Label,
	LabelName,
} from './Contact.styled';
import { fetchDelContact, fetchPutContact } from 'redux/fetchApi';

function Contact({ id, name, number }) {
	const dispatch = useDispatch();
	const [editEnable, setEditEnable] = useState(false);
	const [cancelEditContact, setCancelEditContact] = useState(false);
	const nameInput = useRef(null);
	const numberInput = useRef(null);
	const cancelPutContact = useRef(null);
	const statusLoading = useSelector(statusLoadingState);

	useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === 'Escape') {
				setEditEnable(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (!statusLoading) {
			setCancelEditContact(false);
		}
	}, [statusLoading]);

	useEffect(() => {
		if (editEnable) {
			nameInput.current.style = 'background-color: #fefbe0;';
			numberInput.current.style = 'background-color: #fefbe0;';
		} else {
			nameInput.current.style = 'background-color: transparent;';
			numberInput.current.style = 'background-color: transparent;';
		}
	}, [editEnable]);

	const handleEditContact = e => {
		setEditEnable(true);
	};

	const handleDeleteContact = e => {
		handleClick(e);
		dispatch(fetchDelContact(e.target.id));
	};

	const handlePutContact = contact => {
		setEditEnable(false);
		cancelPutContact.current = dispatch(fetchPutContact(contact));
		setCancelEditContact(true);
	};

	const handleClick = ({ target }) => {
		target.style.scale = '0.9';
		setTimeout(() => (target.style.scale = '1'), 80);
	};

	const idle = !editEnable && !cancelEditContact;
	const edit = editEnable && !cancelEditContact;

	return (
		<>
			<Formik
				initialValues={{
					id,
					name,
					number,
				}}
				onSubmit={handlePutContact}
			>
				<FormBox>
					<InputContainer>
						<Label ref={nameInput}>
							<LabelName>Name:</LabelName>
							<ContactInput name='name' type='text' disabled={!editEnable} />
						</Label>
						<Label ref={numberInput}>
							<LabelName>Number:</LabelName>
							<ContactInput name='number' type='tel' disabled={!editEnable} />
						</Label>
					</InputContainer>

					<ButtonsContainer>
						{edit && (
							<Button id={id} type='submit' disabled={statusLoading}>
								✅
							</Button>
						)}
						{idle && (
							<Button
								id={id}
								type='button'
								disabled={statusLoading}
								onClick={handleEditContact}
							>
								Edit
							</Button>
						)}
						{cancelEditContact && (
							<Button
								id={id}
								type='button'
								disabled={!statusLoading}
								onClick={e => {
									cancelPutContact.current?.abort();
								}}
							>
								❌
							</Button>
						)}
						<Button
							id={id}
							type='button'
							disabled={statusLoading}
							onClick={handleDeleteContact}
						>
							Delete
						</Button>
					</ButtonsContainer>
				</FormBox>
			</Formik>
		</>
	);
}

export default Contact;
