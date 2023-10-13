/** @format */

import { Toaster } from 'react-hot-toast';
import Filter from './Filter';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import { Container, TitleName } from './App.styled';

function App() {
	return (
		<Container>
			<TitleName>Phonebook</TitleName>

			<ContactForm />

			<TitleName>Contacts</TitleName>

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
