/** @format */

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://64ecc0eef9b2b70f2bfae760.mockapi.io';

export const fetchAllContacts = createAsyncThunk('tasks/fetchAll', async () => {
	const response = await axios.get('/contacts');
	return response.data;
});

export const fetchPostContact = createAsyncThunk('tasks/fetchPost', async ({ name, number }) => {
	const response = await axios.post('/contacts', { name, number });
	return response.data;
});

export const fetchPutContact = createAsyncThunk('tasks/fetchPut', async ({ id, name, number }) => {
	const response = await axios.put(`/contacts/${id}`, { name, number });
	return response.data;
});

export const fetchDelContact = createAsyncThunk('tasks/fetchDel', async id => {
	const response = await axios.delete(`/contacts/${id}`);
	return response.data;
});
