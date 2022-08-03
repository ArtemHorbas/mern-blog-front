import { configureStore } from '@reduxjs/toolkit';
import  post from './slice/post';
import auth from './slice/auth';
import filter from './slice/filter';

export const store = configureStore({
	reducer: {
		post,
		auth,
		filter,
	},
});

