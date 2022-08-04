import { createAsyncThunk } from '@reduxjs/toolkit'
import { myAxios } from '../../axios'
import { LoginValues } from '../../pages/Login'
import { RegisterValues } from '../../pages/Registration'
import {  User } from './type'

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: RegisterValues) => {
	const {data} = await myAxios.post<User>('/auth/register', params)
	return data
})

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params: LoginValues) => {
	const {data} = await myAxios.post<User>('/auth/login', params)
	return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
	const {data} = await myAxios.get<User>('/auth/me')
	return data
})