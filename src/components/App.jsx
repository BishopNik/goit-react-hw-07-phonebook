/** @format */

import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { statusError } from 'redux/selectors';
import { resetError } from 'redux/contactsSlice';
import Filter from './Filter';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import { Container, TitleName, FormBox } from './App.styled';
import { toastWindow } from './Helpers';

function App() {
	const error = useSelector(statusError);
	const dispatch = useDispatch();
	useEffect(() => {
		if (error !== null) toastWindow(`Error loading contacts: ${error}`);
		dispatch(resetError());
	}, [dispatch, error]);

	return (
		<Container>
			<FormBox>
				<TitleName>Phonebook</TitleName>

				<ContactForm />

				<TitleName>Contacts</TitleName>
			</FormBox>

			<Filter />

			<ContactList />

			<Toaster
				position='top-right'
				reverseOrder={false}
				gutter={8}
				toastOptions={{
					duration: 5000,
					style: {
						background: '#fdfbea',
						color: '#000000',
					},
				}}
			/>
		</Container>
	);
}

export default App;
