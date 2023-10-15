/** @format */

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, useFormik } from 'formik';
import { statusLoadingState, contactsState, statusError } from 'redux/selectors';
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
import { animationButton, checkContact, toastWindow, schema } from '../Helpers';

function Contact(contact) {
	const dispatch = useDispatch();
	const contacts = useSelector(contactsState);
	const error = useSelector(statusError);
	const [editContact, setEditContact] = useState({ id: '', name: '', number: '' });
	const [editEnable, setEditEnable] = useState(false);
	const [cancelEditContact, setCancelEditContact] = useState(false);
	const nameInput = useRef(null);
	const numberInput = useRef(null);
	const cancelPutContact = useRef(null);
	const statusLoading = useSelector(statusLoadingState);
	const formik = useFormik({
		initialValues: {
			id: contact.id,
			name: contact.name,
			number: contact.number,
		},
		onSubmit: contact => {
			handlePutContact(contact);
		},
	});

	useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === 'Escape') {
				setEditEnable(false);
				formik.setFieldValue('name', editContact.name);
				formik.setFieldValue('number', editContact.number);
			}
		};

		setEditContact(contact);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [contact, editContact.name, editContact.number, formik]);

	useEffect(() => {
		if (!statusLoading) {
			setCancelEditContact(false);
		}
		if (error) {
			formik.setFieldValue('name', editContact.name);
			formik.setFieldValue('number', editContact.number);
		}
	}, [editContact.name, editContact.number, error, formik, statusLoading]);

	useEffect(() => {
		if (editEnable) {
			nameInput.current.style = 'background-color: #fefbf0;';
			numberInput.current.style = 'background-color: #fefbf0;';
			nameInput.current.focus();
		} else {
			nameInput.current.style = 'background-color: transparent;';
			numberInput.current.style = 'background-color: transparent;';
		}
	}, [editEnable]);

	const handleEditContact = e => {
		setEditEnable(true);
	};

	const handleDeleteContact = e => {
		animationButton(e);
		dispatch(fetchDelContact(e.target.id));
		toastWindow(`Contact deleted.`);
	};

	const handlePutContact = contact => {
		setEditContact(contact);
		schema
			.validate(contact)
			.then(() => {
				const status = checkContact(contacts, contact.name, contact.id);
				if (!status) {
					setEditEnable(false);
					cancelPutContact.current = dispatch(fetchPutContact(contact));
					setCancelEditContact(true);
				} else toastWindow(`Please change contacts.`);
			})
			.catch(validationErrors => {
				toastWindow(`Error: ${validationErrors.errors}`);
			});
	};

	const idle = !editEnable && !cancelEditContact;
	const edit = editEnable && !cancelEditContact;

	return (
		<>
			<Formik
				initialValues={{
					id: formik.values.id,
					name: formik.values.name,
					number: formik.values.number,
				}}
				onSubmit={formik.handleSubmit}
			>
				<FormBox>
					<InputContainer>
						<Label ref={nameInput}>
							<LabelName>Name:</LabelName>
							<ContactInput
								name='name'
								type='text'
								{...formik.getFieldProps('name')}
								disabled={!editEnable}
							/>
						</Label>
						<Label ref={numberInput}>
							<LabelName>Number:</LabelName>
							<ContactInput
								name='number'
								type='tel'
								{...formik.getFieldProps('number')}
								disabled={!editEnable}
							/>
						</Label>
					</InputContainer>

					<ButtonsContainer>
						{edit && (
							<Button type='submit' disabled={statusLoading}>
								✅
							</Button>
						)}
						{idle && (
							<Button
								type='button'
								disabled={statusLoading}
								onClick={handleEditContact}
							>
								Edit
							</Button>
						)}
						{cancelEditContact && (
							<Button
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
							id={contact.id}
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
