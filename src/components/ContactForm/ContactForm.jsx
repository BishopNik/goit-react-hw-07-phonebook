/** @format */

import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { contactsState, statusLoadingState } from 'redux/selectors';
import { fetchPostContact } from 'redux/fetchApi';
import { toastWindow, animationButton, checkContact, schema } from '../Helpers';
import {
	Label,
	FormikContact,
	InputFormik,
	AddButton,
	CancelButton,
} from './ContactForm.styled.jsx';

function ContactForm({ onSubmitForm }) {
	const dispatch = useDispatch();
	const contacts = useSelector(contactsState);
	const statusLoading = useSelector(statusLoadingState);
	const cancelAddContact = useRef(null);

	const handleAddContact = ({ name, number }) => {
		const status = checkContact(contacts, name);
		if (!status) {
			cancelAddContact.current = dispatch(fetchPostContact({ name, number }));
		} else toastWindow(`${name} is already in contacts.`);
		return status;
	};

	const handleSubmit = (contact, actions) => {
		schema
			.validate(contact)
			.then(() => {
				!handleAddContact(contact) && actions.resetForm();
			})
			.catch(validationErrors => {
				toastWindow(`Error: ${validationErrors.errors}`);
			});
	};

	return (
		<>
			<Formik
				initialValues={{
					name: '',
					number: '',
				}}
				onSubmit={handleSubmit}
			>
				<FormikContact>
					<Label>
						Name
						<InputFormik
							type='text'
							name='name'
							pattern="^[a-zA-Zа-яА-Я]+([' \-]?[a-zA-Zа-яА-Я ])*$"
							title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
							required
							autoComplete='off'
							placeholder='Aneta'
						/>
					</Label>

					<Label>
						Number
						<InputFormik
							type='tel'
							name='number'
							pattern='\+?\d{1,4}[\-.\s]?\(?\d{1,3}\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}'
							title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
							required
							autoComplete='off'
							placeholder='48-787-453-876'
						/>
					</Label>

					<AddButton type='submit' onClick={animationButton} disabled={statusLoading}>
						Add contact
					</AddButton>
					<CancelButton
						type='button'
						disabled={!statusLoading}
						onClick={e => {
							animationButton(e);
							cancelAddContact.current?.abort();
						}}
					>
						❌
					</CancelButton>
				</FormikContact>
			</Formik>
		</>
	);
}

export default ContactForm;
