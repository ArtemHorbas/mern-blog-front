import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import  post from './post/slice';
import auth from './auth/slice';
import filter from './filter/slice';

export const store = configureStore({
	reducer: {
		post,
		auth,
		filter,
	},
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector