/** @format */

export const filterState = state => state.filter.value;

export const contactsState = state => state.contacts.items;

export const statusLoadingState = state => state.contacts.isLoading;

export const statusError = state => state.contacts.error;
