import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { myAxios } from '../../axios'

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
	const {data} = await myAxios.post('/auth/register', params)
	return data
})

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
	const {data} = await myAxios.post('/auth/login', params)
	return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
	const {data} = await myAxios.get('/auth/me')
	return data
})


const initialState = {
	data: null,
	status: 'pre-loading'
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut(state){
			state.data = null
		}
	},
	extraReducers: {
		[fetchRegister.pending]: (state) => {
			state.data = null
			state.status = 'loading'
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'loaded'
		},
		[fetchRegister.rejected]: (state) => {
			state.data = null
			state.status = 'error'
		},
		[fetchAuth.pending]: (state) => {
			state.data = null
			state.status = 'loading'
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'loaded'
		},
		[fetchAuth.rejected]: (state) => {
			state.data = null
			state.status = 'error'
		},
		[fetchAuthMe.pending]: (state) => {
			state.data = null
			state.status = 'loading'
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'loaded'
		},
		[fetchAuthMe.rejected]: (state) => {
			state.data = null
			state.status = 'error'
		}
	}
})

export const isAuthSelector =  state => Boolean(state.auth.data)

export const { logOut } = authSlice.actions

export default authSlice.reducer