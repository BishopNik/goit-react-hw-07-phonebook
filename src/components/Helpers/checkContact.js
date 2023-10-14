/** @format */

export function checkContact(contacts, name) {
	const checkName = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
	return checkName ? true : false;
}
