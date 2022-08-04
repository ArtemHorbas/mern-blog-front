import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { fetchAuth, fetchAuthMe, fetchRegister } from './asyncThunk'
import { IAuthSlice, Status } from './type'

const initialState: IAuthSlice = {
	data: null,
	status: Status.FIRST
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut(state){
			state.data = null
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchRegister.pending, (state) => {
			state.data = null
			state.status = Status.LOADING
		});
		builder.addCase(fetchRegister.fulfilled, (state, action) => {
			state.data = action.payload
			state.status = Status.SUCCESS
		});
		builder.addCase(fetchRegister.rejected, (state) => {
			state.data = null
			state.status = Status.ERROR
		});
		//
		builder.addCase(fetchAuth.pending, (state) => {
			state.data = null
			state.status = Status.LOADING
		});
		builder.addCase(fetchAuth.fulfilled, (state, action) => {
			state.data = action.payload
			state.status = Status.SUCCESS
		});
		builder.addCase(fetchAuth.rejected, (state) => {
			state.data = null
			state.status = Status.ERROR
		});
		//
		builder.addCase(fetchAuthMe.pending, (state) => {
			state.data = null
			state.status = Status.LOADING
		});
		builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
			state.data = action.payload
			state.status = Status.SUCCESS
		});
		builder.addCase(fetchAuthMe.rejected, (state) => {
			state.data = null
			state.status = Status.ERROR
		});
	}
})

export const isAuthSelector =  (state: RootState) => Boolean(state.auth.data)

export const { logOut } = authSlice.actions

export default authSlice.reducer