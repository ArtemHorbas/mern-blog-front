import { configureStore } from '@reduxjs/toolkit';
import  post from './slice/post';
import auth from './slice/auth';

export const store = configureStore({
	reducer: {
		post,
		auth,
	},
});

