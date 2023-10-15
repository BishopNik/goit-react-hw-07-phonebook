/** @format */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact';
import { ContactContainer, ContactsBox } from './ContactList.styled';
import { filterState, contactsState } from 'redux/selectors';
import { fetchAllContacts } from 'redux/fetchApi';

function ContactList() {
	const dispatch = useDispatch();
	const filterValue = useSelector(filterState);
	const contacts = useSelector(contactsState);

	const filteredContacts = contacts
		? contacts.filter(contact =>
				contact.name.toLowerCase().includes(filterValue?.toLowerCase())
		  )
		: [];

	useEffect(() => {
		dispatch(fetchAllContacts());
	}, [dispatch]);

	return (
		<ContactsBox>
			{filteredContacts?.reverse().map(({ id, name, number }) => (
				<ContactContainer key={id}>
					<Contact id={id} name={name} number={number} />
				</ContactContainer>
			))}
		</ContactsBox>
	);
}

export default ContactList;
